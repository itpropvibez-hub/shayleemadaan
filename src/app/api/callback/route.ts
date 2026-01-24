import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawData: Record<string, any> = {};

    formData.forEach((value, key) => {
      const strValue = value as string;
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

    const formatKey = (key: string) => 
      key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

    // Table rows for the Admin notification
    const tableRows = Object.entries(rawData)
      .map(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(", ") : value;
        return `
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; width: 35%;">${formatKey(key)}</td>
            <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 14px; font-weight: 400;">${displayValue || "—"}</td>
          </tr>`;
      }).join("");

    // Founder-Level Reply Template
    const leadName = rawData.name || "there";
    const replyToEmail = rawData.email || "";
    
    const querySummary = Object.entries(rawData)
      .map(([key, value]) => `• ${formatKey(key)}: ${value}`)
      .join("\n");

    const emailSubject = `Personal Note: Your Inquiry with ShailyMadaan`;
    // calender invite : If yes, you can grab a time that works for you on my calendar here: [Link].
    const emailBody = `Hi ${leadName},

Thank you for reaching out to PropVibez. I have personally reviewed your inquiry regarding:

${querySummary}

At PropVibez, we focus on delivering bespoke real estate solutions tailored to high-value requirements. I’d love to share some initial thoughts on how we can streamline this process for you.

Are you available for a 10-minute introductory call this week? 

Best regards,

Shaily Madaan
Founder & Director | PropVibez
shailymadaan.com`;

    const mailtoLink = `mailto:${replyToEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    await transporter.sendMail({
      from: `"PropVibez" <${process.env.EMAIL_USER}>`,
      to: "shailyrealtorlife@gmail.com",
      subject: `New Client Inquiry: ${rawData.name || ""}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Georgia', serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 60px 20px;">
            <tr>
              <td align="center">
                <table width="100%" style="max-width: 550px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 40px;">
                  <tr>
                    <td style="padding-bottom: 40px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                      <div style="font-size: 20px; font-weight: bold; color: #0f172a; letter-spacing: 2px;">PROPVIBEZ</div>
                      <div style="font-size: 10px; color: #64748b; letter-spacing: 3px; margin-top: 5px; text-transform: uppercase;">Lead Notification</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px 0;">
                      <h2 style="font-size: 18px; color: #0f172a; margin-bottom: 24px; font-weight: 400; font-style: italic;">New Client Engagement Received</h2>
                      <p style="color: #475569; font-size: 14px; line-height: 1.8; margin-bottom: 30px; font-family: sans-serif;">
                        The following inquiry has been captured through your digital portfolio. Please review the details below, a timely and personalized response is recommended to maintain brand standards.
                      </p>
                      
                      <table width="100%" style="border-collapse: collapse; margin-bottom: 40px; font-family: sans-serif;">
                        ${tableRows}
                      </table>

                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <a href="${mailtoLink}" style="border: 1px solid #0f172a; color: #0f172a; padding: 12px 30px; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; display: inline-block; font-family: sans-serif;">
                            Response via Email
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="text-align: center; padding-top: 40px; border-top: 1px solid #f1f5f9;">
                      <p style="margin: 0; color: #94a3b8; font-size: 11px; letter-spacing: 1px; font-family: sans-serif;">
                        SHAILY MADAAN • PROPVIBEZ
                      </p>
                      <p style="margin: 0; color: #94a3b8; font-size: 11px; letter-spacing: 1px; font-family: sans-serif;">
                        Automated Lead Notification &copy; ${new Date().getFullYear()}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Route Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}