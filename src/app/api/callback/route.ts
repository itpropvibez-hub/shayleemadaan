import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawData: Record<string, any> = {};

    // 1. Extract and Parse Data
    formData.forEach((value, key) => {
      const strValue = value as string;
      // Handle JSON strings (like the propertyPlan array)
      if (strValue.startsWith("[") || strValue.startsWith("{")) {
        try {
          rawData[key] = JSON.parse(strValue);
        } catch {
          rawData[key] = strValue;
        }
      } else {
        rawData[key] = strValue;
      }
    });

    // 2. Transporter Config (Use Hostinger Env Vars)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Build Table Rows
    const tableRows = Object.entries(rawData)
      .map(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(", ") : value;
        const displayKey = key.replace(/([A-Z])/g, ' $1');
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #edf2f7; font-weight: 600; text-transform: capitalize; color: #718096;">${displayKey}</td>
            <td style="padding: 12px; border-bottom: 1px solid #edf2f7;">${displayValue || "N/A"}</td>
          </tr>`;
      }).join("");

    // 4. Send Email
    await transporter.sendMail({
      from: `"Lead System" <${process.env.EMAIL_USER}>`,
      to: "shailyrealtorlife@gmail.com",
      replyTo: rawData.email,
      subject: `🚀 New Lead: ${rawData.name || "Request"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px;">
          <h2 style="color: #2563eb;">New Lead Captured</h2>
          <table style="width: 100%; border-collapse: collapse;">${tableRows}</table>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Route Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}