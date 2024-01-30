// app/api/revalidate/route.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for the HTTP method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Here you should also check for the secret header to secure this endpoint
  const secret = req.headers["x-custom-secret"];
  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Call the revalidation method here
    // The path must match the page path you want to revalidate
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, return it
    return res.status(500).send("Error revalidating");
  }
}
