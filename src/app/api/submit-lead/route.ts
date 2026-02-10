import { NextRequest, NextResponse } from "next/server";

const CRM_ENDPOINT =
  "https://app-api-lead-collector-backend-prod.azurewebsites.net/requests";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text || `CRM responded with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
