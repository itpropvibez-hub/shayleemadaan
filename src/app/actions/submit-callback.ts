"use server";

import nodemailer from "nodemailer";

export async function submitCallbackForm(formData: FormData) {
  try {
    const rawData: any = {};
    
    // Extracting data safely
    formData.forEach((value, key) => {
      const strValue = value as string;
      // Only try to parse if it looks like a JSON array/object
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }); 

    // Constructing the HTML Table safely
    const tableRows = Object.entries(rawData)
      .map(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(", ") : value;
        const displayKey = key.replace(/([A-Z])/g, ' $1');
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #edf2f7; font-weight: 600; text-transform: capitalize; width: 40%; color: #718096;">${displayKey}</td>
            <td style="padding: 12px; border-bottom: 1px solid #edf2f7;">${displayValue || "N/A"}</td>
          </tr>
        `;
      }).join("");

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; color: #1a202c;">
        <h2 style="color: #2563eb; margin-bottom: 8px;">New Lead Captured</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          ${tableRows}
        </table>
        <div style="text-align: center; margin-top: 20px;">
          <a href="mailto:${rawData.email}" style="background: #2563eb; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Customer</a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Lead System" <${process.env.EMAIL_USER}>`,
      to: "shailyrealtorlife@gmail.com",
      replyTo: rawData.email,
      subject: `🚀 New Lead: ${rawData.name || "Request"}`,
      html: htmlBody,
    });

    return { success: true };
  } catch (error: any) {
    // Log the actual error to your terminal so you can see what failed
    console.error("Detailed Email Error:", error.message);
    return { success: false, error: error.message };
  }
}