// app/api/generate-article/route.js
import { NextResponse } from "next/server.js";
import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic");

    if (!topic) {
      return NextResponse.json({ error: "Missing topic parameter" }, { status: 400 });
    }

    const apiUrl = `https://www.artikelschreiber.com/api/articleapi.php?keyword=${encodeURIComponent(topic)}`;
    const res = await fetch(apiUrl);
    const article = await res.text();

    const metaDescription = article.slice(0, 160).replace(/\s+/g, " ") + "...";
    const thumbnailUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      topic + " high quality article thumbnail"
    )}`;

    // File path to save
    const filePath = path.join(process.cwd(), "data", "articles.json");

    // Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      existingData = fileContent ? JSON.parse(fileContent) : [];
    }

    // Check if article already exists
    const existingArticle = existingData.find((a) => a.topic === topic);
    if (!existingArticle) {
      existingData.push({
        topic,
        metaDescription,
        thumbnailUrl,
        content: article,
        createdAt: new Date().toISOString(),
      });

      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    }

    return NextResponse.json({
      message: "Article generated successfully",
      topic,
      metaDescription,
      thumbnailUrl,
      content: article,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate article" }, { status: 500 });
  }
}
