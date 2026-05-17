import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Using Fal AI's Flux Pro for "God Tier" generation
const FAL_ENDPOINT = "fal-ai/flux-pro/v1.1";

export async function POST(request: Request) {
    try {
        // 1. Verify Authentication (Commercial Protection)
        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized: Please sign in to generate." }, { status: 401 });
        }

        // TODO: (Optional for Billion Dollar System)
        // Check Credit Balance / Subscription Status here.
        // const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single()
        // if (profile.credits < 1) return NextResponse.json({ error: "Insufficient credits" }, { status: 403 })

        const { prompt, aspectRatio, outputCount } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const apiKey = process.env.FAL_KEY;
        if (!apiKey) {
            console.error("FAL_KEY is missing");
            return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
        }

        // Determine dimensions based on aspect ratio
        const image_size = aspectRatio === "portrait" ? "portrait_16_9" : "landscape_16_9";

        // Construct "God-Tier" Prompt
        // The model is smart enough, but we guide it towards the "Ayvek" style
        const fullPrompt = `${prompt}, cinematic lighting, masterpiece, 8k, highly detailed, sharp focus, photorealistic`;

        // Payload for Fal AI
        const payload = {
            prompt: fullPrompt,
            image_size: image_size,
            num_images: outputCount || 1,
            safety_tolerance: "2", // Allow more creative freedom
        };

        // Submit to Fal AI Queue
        const response = await fetch(`https://queue.fal.run/${FAL_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Authorization": `Key ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Fal AI Error (${response.status}): ${errorText}`);
        }

        const { request_id } = await response.json();

        // Poll for result
        let result = null;
        let attempts = 0;
        const maxAttempts = 60; // 60 seconds max

        while (attempts < maxAttempts) {
            const statusResponse = await fetch(`https://queue.fal.run/${FAL_ENDPOINT}/requests/${request_id}/status`, {
                headers: {
                    "Authorization": `Key ${apiKey}`,
                },
            });

            if (!statusResponse.ok) {
                throw new Error(`Polling Error: ${statusResponse.status}`);
            }

            const statusData = await statusResponse.json();

            if (statusData.status === "COMPLETED") {
                result = await fetch(`https://queue.fal.run/${FAL_ENDPOINT}/requests/${request_id}`, {
                    headers: {
                        "Authorization": `Key ${apiKey}`,
                    },
                }).then(res => res.json());
                break;
            } else if (statusData.status === "FAILED") {
                throw new Error(`Generation Failed: ${JSON.stringify(statusData)}`);
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
        }

        if (!result || !result.images) {
            throw new Error("Generation timed out or returned no images");
        }

        // Format for frontend
        const images = result.images.map((img: any) => img.url);

        return NextResponse.json({ output: images }, { status: 201 });

    } catch (error: any) {
        console.error("Generation Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
