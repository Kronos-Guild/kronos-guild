import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import "dotenv/config";

/**
 * Script: generateBlogImages.ts
 *
 * Generates random geometric pattern images for MDX blog posts that don't yet have a
 * corresponding image in the public directory. The image filename will match the
 * blogpost slug (i.e. the MDX filename without extension). Uses the OpenAI Image
 * Generation API (DALL·E) via the official SDK.
 *
 * Usage:
 *   1) Create a .env file with OPENAI_API_KEY=your_key
 *   2) Run: pnpm generate:images
 */

// Ensure the script is executed with an API key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌  OPENAI_API_KEY environment variable is not set.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Directories
const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Define some random palettes and shape descriptions to vary the prompts
const COLOR_PALETTES = [
  "warm oranges and yellows",
  "cool blues and teals",
  "vibrant purples and pinks",
  "earthy greens and browns",
  "sunset-inspired reds and ambers",
  "neon cyans and magentas",
];

const SHAPE_STYLES = [
  "circles and triangles",
  "squares and semi-circles",
  "overlapping rounded polygons",
  "chevrons and diamonds",
  "quarter circles and rectangles",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSlug(fileName: string): string {
  return fileName.replace(/\.mdx?$/i, "");
}

type ImageData = {
  url?: string;
  b64_json?: string;
};

async function generateImage(prompt: string): Promise<ImageData> {
  const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    n: 1,
    size: "1024x1024",
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("No image data returned from OpenAI");
  }

  return response.data[0] as ImageData;
}

async function downloadImage(url: string, outputPath: string) {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(
      `Failed to download image: ${res.status} ${res.statusText}`
    );
  const arrayBuffer = await res.arrayBuffer();
  await fs.promises.writeFile(outputPath, Buffer.from(arrayBuffer));
}

async function main() {
  const blogFiles = (await fs.promises.readdir(BLOG_DIR)).filter((f) =>
    /\.mdx?$/.test(f)
  );

  const slugsMissingImages: string[] = blogFiles
    .map(getSlug)
    .filter((slug) => !fs.existsSync(path.join(PUBLIC_DIR, `${slug}.png`)));

  if (slugsMissingImages.length === 0) {
    console.log("✅  All blog posts already have images – nothing to do.");
    return;
  }

  console.log(
    `🖼️  Generating images for ${slugsMissingImages.length} blog post(s)...`
  );

  for (const slug of slugsMissingImages) {
    try {
      const palette = randomFrom(COLOR_PALETTES);
      const shapes = randomFrom(SHAPE_STYLES);
      const prompt = `Design a seamless 1:1 (square) geometric pattern that fills the canvas edge-to-edge with ${shapes}. Use a consistent modern flat vector style with clean solid colours, no borders or central motif—only the repeating pattern itself. Apply a colour palette of ${palette}.`;

      console.log(`   • Generating image for \"${slug}\"...`);
      const imageData = await generateImage(prompt);
      const outputPath = path.join(PUBLIC_DIR, `${slug}.png`);

      if (imageData.url) {
        await downloadImage(imageData.url, outputPath);
      } else if (imageData.b64_json) {
        const buffer = Buffer.from(imageData.b64_json, "base64");
        await fs.promises.writeFile(outputPath, buffer);
      } else {
        throw new Error("Image response had neither url nor b64_json");
      }

      console.log(`     → Saved to public/${slug}.png`);
    } catch (err) {
      console.error(`   ✖ Failed to generate image for ${slug}:`, err);
    }
  }

  console.log("🎉  Done generating images.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
