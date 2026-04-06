import { NextResponse } from "next/server";

const FORM_ID = "369e47d9-d2e4-48f1-bb08-ba5736342273";
const BASE_URL = "https://www.betazu.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, email, type, source } = body;

    // 🔒 VALIDATION
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    // 🔥 STEP 1: Fetch schema (for safety fallback)
    const schemaRes = await fetch(
      `${BASE_URL}/api/sites/form/${FORM_ID}`
    );
    const schemaJson = await schemaRes.json();
    const fields = schemaJson?.schema?.fields || [];

    // 🔥 STEP 2: Create label map
    const labelMap = Object.fromEntries(
      fields.map((f: any) => [
        f.label.toLowerCase(),
        f.name,
      ])
    );

    // 🔥 STEP 3: Build payload safely
    const mappedPayload: any = {};

    const safeMap = (key: string, value: any) => {
      const k = key.toLowerCase();

      let fieldId =
        labelMap[k] ||
        labelMap[
          k === "phone"
            ? "phone number"
            : k === "email"
            ? "email address"
            : k === "name"
            ? "full name"
            : k
        ];

      if (fieldId) {
        mappedPayload[fieldId] = value;
      }
    };

    // 🎯 Map all fields
    safeMap("name", name);
    safeMap("phone", phone);
    safeMap("email", email || "");
    safeMap("type", type || "");
    safeMap("source", source || "westin-landing-page");

    // 🧠 DEBUG (remove in production)
    console.log("Mapped Payload:", mappedPayload);

    // ⏱️ TIMEOUT CONTROL
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    // 🚀 SEND TO BETAZU
    const res = await fetch(
      `${BASE_URL}/api/sites/form/${FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedPayload),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Betazu Error:", errorText);

      return NextResponse.json(
        { success: false, message: "Failed to submit lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
    });

  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}