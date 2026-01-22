"use server";

import nodemailer from "nodemailer";

export async function submitCallbackForm(formData: FormData) {
  try {
    const rawData: any = {};
    formData.forEach((value, key) => {
      try {
        // Handle the JSON.stringify from client
        rawData[key] = JSON.parse(value as string);
      } catch {
        rawData[key] = value;
      }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your itpropvibez@gmail.com
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; color: #1a202c;">
        <h2 style="color: #2563eb; margin-bottom: 8px;">New Lead Captured</h2>
        <p style="color: #4a5568;">Details of the callback request:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          ${Object.entries(rawData)
            .map(([key, value]) => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; font-weight: 600; text-transform: capitalize; width: 40%; color: #718096;">${key.replace(/([A-Z])/g, ' $1')}</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7;">${Array.isArray(value) ? value.join(", ") : value}</td>
              </tr>
            `).join("")}
        </table>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #edf2f7; text-align: center;">
          <a href="mailto:${rawData.email}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
             Reply to Customer
          </a>
          <p style="font-size: 12px; color: #a0aec0; margin-top: 15px;">
            Clicking the button above will open your mail app to ${rawData.email}
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Lead generated" <${process.env.EMAIL_USER}>`,
      to: "shailyrealtorlife@gmail.com", // The recipient address you requested
      replyTo: rawData.email, // Allows you to just hit 'Reply' in Gmail
      subject: `🚀 New Lead: ${rawData.name}`,
      html: htmlBody,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
}