import { NextResponse } from "next/server";

const FAL_ENDPOINT = "fal-ai/flux-pro/v1.1";

// Demo images for when no API key is configured
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
];

export async function POST(request: Request) {
  try {
    const { prompt, aspectRatio, outputCount } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.FAL_KEY;

    // If no API key, return demo images
    if (!apiKey || apiKey === "your-fal-key-here") {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
      const count = outputCount || 1;
      const images = Array.from({ length: count }, (_, i) =>
        DEMO_IMAGES[i % DEMO_IMAGES.length]
      );
      return NextResponse.json({ output: images, demo: true }, { status: 201 });
    }

    const image_size =
      aspectRatio === "portrait" ? "portrait_16_9" : "landscape_16_9";

    const fullPrompt = `${prompt}, cinematic lighting, masterpiece, 8k, highly detailed, sharp focus, photorealistic`;

    const payload = {
      prompt: fullPrompt,
      image_size,
      num_images: outputCount || 1,
      safety_tolerance: "2",
    };

    const response = await fetch(`https://queue.fal.run/${FAL_ENDPOINT}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fal AI Error (${response.status}): ${errorText}`);
    }

    const { request_id } = await response.json();

    let result = null;
    let attempts = 0;
    const maxAttempts = 60;

    while (attempts < maxAttempts) {
      const statusResponse = await fetch(
        `https://queue.fal.run/${FAL_ENDPOINT}/requests/${request_id}/status`,
        {
          headers: { Authorization: `Key ${apiKey}` },
        }
      );

      if (!statusResponse.ok) {
        throw new Error(`Polling Error: ${statusResponse.status}`);
      }

      const statusData = await statusResponse.json();

      if (statusData.status === "COMPLETED") {
        result = await fetch(
          `https://queue.fal.run/${FAL_ENDPOINT}/requests/${request_id}`,
          { headers: { Authorization: `Key ${apiKey}` } }
        ).then((res) => res.json());
        break;
      } else if (statusData.status === "FAILED") {
        throw new Error(`Generation Failed: ${JSON.stringify(statusData)}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;
    }

    if (!result || !result.images) {
      throw new Error("Generation timed out or returned no images");
    }

    const images = result.images.map((img: any) => img.url);
    return NextResponse.json({ output: images }, { status: 201 });
  } catch (error: any) {
    console.error("Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
