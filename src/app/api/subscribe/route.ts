import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, riskLevel, sector } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Ungültige Email-Adresse" }, { status: 400 });
    }

    // Log subscriber (Vercel will capture this in logs)
    console.log(
      JSON.stringify({
        event: "new_subscriber",
        email,
        riskLevel,
        sector,
        timestamp: new Date().toISOString(),
      })
    );

    // TODO: Connect to email service (Resend, ConvertKit, etc.)
    // TODO: Store in database (Vercel KV, Supabase, etc.)

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
