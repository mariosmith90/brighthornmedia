"use strict";

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { Storage } = require("./node_modules/@google-cloud/storage/build/cjs/src");

// GCS_PRIVATE_KEY stored in Firebase Secret Manager
// GCS_CLIENT_EMAIL and GCS_BUCKET_NAME are set via functions/.env
const gcsPrivateKey = defineSecret("GCS_PRIVATE_KEY");

const EXPIRY_MS = 15 * 60 * 1000;

exports.nextServer = onRequest(
  {
    region: "us-east1",
    memory: "256MiB",
    timeoutSeconds: 30,
    concurrency: 80,
    secrets: [gcsPrivateKey],
  },
  async (req, res) => {
    // CORS — Firebase Hosting same-origin is fine; allow for local dev
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, OPTIONS");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    const key = req.query.key;
    if (!key) {
      res.status(400).json({ error: "Missing ?key param" });
      return;
    }

    const sanitized = String(key).replace(/\.\./g, "").replace(/^\/+/, "");
    if (!sanitized) {
      res.status(400).json({ error: "Invalid key" });
      return;
    }

    try {
      const storage = new Storage({
        projectId: "organic-spirit-488116-e2",
        credentials: {
          client_email: process.env.GCS_CLIENT_EMAIL,
          // Secret Manager stores real newlines; .env.local uses \n — handle both
          private_key: (process.env.GCS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        },
      });

      const bucket = process.env.GCS_BUCKET_NAME || "brighthornmedia-images";
      const [url] = await storage
        .bucket(bucket)
        .file(sanitized)
        .getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + EXPIRY_MS,
        });

      res.status(200).json({ url });
    } catch (err) {
      console.error("[/api/media] Failed to sign URL for key:", sanitized, err);
      res.status(500).json({ error: "Could not generate signed URL" });
    }
  }
);
