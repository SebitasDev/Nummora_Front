import { NextResponse } from "next/server";

interface VerifyScoreRequest {
    address: string;
}

interface VerifyScoreResponse {
    verified: boolean;
    score?: number;
    error?: string;
}

interface StampsApiResponse {
    score: number;
    passing_score: boolean;
    threshold: number;
    error?: string;
}

export async function POST(req: Request) {
    try {
        const body: VerifyScoreRequest = await req.json();
        const { address } = body;

        if (!address) {
            return NextResponse.json(
                { verified: false, error: "Address is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.PASSPORT_API_KEY;
        const scorerId = process.env.NEXT_PUBLIC_PASSPORT_SCORER_ID;

        if (!apiKey || !scorerId) {
            console.error("Missing environment variables:", {
                hasApiKey: !!apiKey,
                hasScorerID: !!scorerId,
            });
            return NextResponse.json(
                {
                    verified: false,
                    error:
                        "Server configuration error - missing PASSPORT_API_KEY or SCORER_ID",
                },
                { status: 500 }
            );
        }

        const url = `https://api.passport.xyz/v2/stamps/${scorerId}/score/${address}`;

        console.log("Verifying score for address:", address);
        console.log("API URL:", url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-KEY": apiKey,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API error:", response.status, errorText);
            return NextResponse.json(
                { verified: false, error: "API request failed" },
                { status: 500 }
            );
        }

        const data: StampsApiResponse = await response.json();

        console.log("API Response:", data);

        const meetsThreshold = data.score >= 0.5;

        if (meetsThreshold && data.passing_score) {
            console.log(`✅ Score verified: ${data.score} >= 0.5`);
            return NextResponse.json(
                { verified: true, score: data.score },
                { status: 200 }
            );
        } else {
            console.log(`❌ Score too low: ${data.score} < 0.5`);
            return NextResponse.json(
                { verified: false, score: data.score },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error verifying Passport score:", error);
        return NextResponse.json(
            { verified: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Opcional: si alguien hace GET
export function GET() {
    return NextResponse.json(
        { verified: false, error: "Method not allowed" },
        { status: 405 }
    );
}
