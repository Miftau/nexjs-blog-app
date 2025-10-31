// app/api/generate-article/route.js
import { NextResponse } from "next/server.js";
import fs from "fs";
import path from "path";

// ✅ Tell Next.js to use Node.js runtime (not Edge)
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic");

    if (!topic) {
      return NextResponse.json({ error: "Missing topic parameter" }, { status: 400 });
    }

    // Fetch article from Artikelschreiber API
    const apiUrl = `https://www.artikelschreiber.com/api/articleapi.php?keyword=${encodeURIComponent(topic)}`;
    const res = await fetch(apiUrl);
    const article = await res.text();

    // Generate SEO metadata
    const metaDescription = article.slice(0, 160).replace(/\s+/g, " ") + "...";
    const thumbnailUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      topic + " high quality article thumbnail"
    )}`;

    // ✅ Path to the articles.json file
    const filePath = path.join(process.cwd(), "data", "articles.json");

    // Ensure data folder exists
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = fileContent ? JSON.parse(fileContent) : [];
    }

    // Avoid duplicates
    const exists = existingData.some((a) => a.topic.toLowerCase() === topic.toLowerCase());
    if (!exists) {
      existingData.push({
        topic,
        metaDescription,
        thumbnailUrl,
        content: article,
        createdAt: new Date().toISOString(),
      });

      // ✅ Write to JSON file
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    }

    return NextResponse.json({
      message: "Article generated and saved successfully ✅",
      topic,
      metaDescription,
      thumbnailUrl,
      content: article,
    });
  } catch (error) {
    console.error("Error generating article:", error);
    return NextResponse.json({ error: "Failed to generate article" }, { status: 500 });
  }
}
