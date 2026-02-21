"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The /work route now redirects to the homepage, where the
 * gallery opens as a full-screen overlay.
 */
export default function WorkRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
