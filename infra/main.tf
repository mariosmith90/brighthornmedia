terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project               = var.project_id
  region                = var.region
  billing_project       = var.project_id
  user_project_override = true
}

provider "google-beta" {
  project               = var.project_id
  region                = var.region
  billing_project       = var.project_id
  user_project_override = true
}

# NOTE: The org policy override (iam.allowedPolicyMemberDomains) is managed
# outside Terraform via gcloud. Run the one-time setup script:
#   ./setup.sh
#
# Public read is handled via legacy ACLs (not IAM bindings) so the org
# policy constraint on allUsers does not apply.

# ── GCS Bucket ──────────────────────────────────────────────────────────────

resource "google_storage_bucket" "media" {
  name                        = var.bucket_name
  location                    = var.bucket_location
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  force_destroy               = false

  versioning {
    enabled = false
  }

  cors {
    origin          = var.allowed_origins
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["Content-Type", "Cache-Control"]
    max_age_seconds = 3600
  }

  lifecycle_rule {
    condition {
      age = 365
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }

  labels = {
    project     = "brighthornmedia"
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ── Service account for signed URL generation ─────────────────────────────────

resource "google_service_account" "media_reader" {
  account_id   = "brighthorn-media-reader"
  display_name = "Brighthorn Media Reader"
  description  = "Used by the Next.js app to generate signed URLs for GCS objects"
}

resource "google_storage_bucket_iam_member" "media_reader_access" {
  bucket = google_storage_bucket.media.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.media_reader.email}"
}

# ── Folders (placeholder objects to create logical structure) ─────────────────

resource "google_storage_bucket_object" "folder_portfolio" {
  name    = "portfolio/.keep"
  content = " "
  bucket  = google_storage_bucket.media.name
}

resource "google_storage_bucket_object" "folder_campaigns" {
  name    = "campaigns/.keep"
  content = " "
  bucket  = google_storage_bucket.media.name
}

resource "google_storage_bucket_object" "folder_events" {
  name    = "events/.keep"
  content = " "
  bucket  = google_storage_bucket.media.name
}

# ── Firebase (Hosting for Next.js deployment) ───────────────────────────────

resource "google_project_service" "firebase_api" {
  project            = var.project_id
  service            = "firebase.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "firebase_hosting_api" {
  project            = var.project_id
  service            = "firebasehosting.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild_api" {
  project            = var.project_id
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "run_api" {
  project            = var.project_id
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id

  depends_on = [
    google_project_service.firebase_api,
    google_project_service.firebase_hosting_api,
  ]
}

resource "google_firebase_web_app" "web" {
  provider     = google-beta
  project      = var.project_id
  display_name = var.firebase_web_app_display_name

  depends_on = [google_firebase_project.default]
}

resource "google_firebase_hosting_site" "site" {
  provider = google-beta
  project  = var.project_id
  site_id  = var.firebase_site_id

  depends_on = [google_firebase_project.default]
}
