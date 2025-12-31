import { serve } from "https://deno.land/std@0.223.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// -------------------- CORS --------------------
function cors(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(response.body, {
    status: response.status,
    headers,
  });
}

serve(async (req) => {
  try {
    // Handle preflight
    if (req.method === "OPTIONS") {
      return cors(new Response("ok", { status: 200 }));
    }

    if (req.method !== "POST") {
      return cors(
        new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
        })
      );
    }

    const data = await req.json();

    // -------------------- ENV --------------------
    const smtpHost = Deno.env.get("SMTP_HOST")!;
    const smtpPort = Number(Deno.env.get("SMTP_PORT")!);
    const smtpUser = Deno.env.get("SMTP_USER")!;
    const smtpPass = Deno.env.get("SMTP_PASS")!;
    const secure = Deno.env.get("SMTP_SECURE") === "true";
    const adminEmail = Deno.env.get("ADMIN_EMAIL")!;

    // *** IMPORTANT ***
    // Bạn chỉ nên dùng PROJECT_URL + SERVICE_ROLE_KEY
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;


    // FIX: Tắt persistSession để client chạy đúng trong edge functions
    const supabase = createClient(supabaseUrl, supabaseServiceRole, {
      auth: { persistSession: false }
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // -------------------- SMTP SEND FUNCTION --------------------
    async function sendSMTP(to: string, html: string, subject: string) {
      const conn = secure
        ? await Deno.connectTls({ hostname: smtpHost, port: smtpPort })
        : await Deno.connect({ hostname: smtpHost, port: smtpPort });

      async function smtp(cmd: string) {
        await conn.write(encoder.encode(cmd + "\r\n"));
        const buf = new Uint8Array(4096);
        const n = await conn.read(buf);
        return decoder.decode(buf.subarray(0, n));
      }

      await smtp("EHLO localhost");
      await smtp("AUTH LOGIN");
      await smtp(btoa(smtpUser));
      await smtp(btoa(smtpPass));

      await smtp(`MAIL FROM:<${smtpUser}>`);
      await smtp(`RCPT TO:<${to}>`);
      await smtp("DATA");

      const body = 
`From: ${smtpUser}
To: ${to}
Subject: ${subject}
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8

${html}
`;

      await smtp(body + "\r\n.");
      await smtp("QUIT");

      conn.close();
    }

    // -------------------- SERVICE NAME MAPPING --------------------
    const serviceNames: Record<string, string> = {
      'repairService': 'Sửa chữa Drone',
      'surveyingDrone': 'Drone Trắc địa',
      'deliveryDrone': 'Drone Vận chuyển',
      'flightPermit': 'Dịch vụ Phép bay',
      'droneImport': 'Nhập khẩu Drone',
      'droneFilming': 'Quay phim Flycam'
    };

    const displayService = serviceNames[data.service] || data.service || "Không có";

    // -------------------- ADMIN EMAIL --------------------
    const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">📩 Liên Hệ Mới</h1>
                  <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">Từ Website Hitek Flycam</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">

                  <!-- Customer Info Section -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-bottom: 25px;">
                        <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                          👤 Thông Tin Khách Hàng
                        </h2>
                      </td>
                    </tr>

                    <!-- Name -->
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">Họ và tên:</td>
                            <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${data.name}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Email -->
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">Email:</td>
                            <td style="color: #1f2937; font-size: 14px;">
                              <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">${data.email}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Phone -->
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">Số điện thoại:</td>
                            <td style="color: #1f2937; font-size: 14px;">
                              <a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none;">${data.phone}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Company -->
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">Công ty:</td>
                            <td style="color: #1f2937; font-size: 14px;">${data.company || "Không có"}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Location -->
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">Địa điểm:</td>
                            <td style="color: #1f2937; font-size: 14px;">${data.location || "Không có"}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Service -->
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="color: #6b7280; font-size: 14px; font-weight: 600;">Dịch vụ quan tâm:</td>
                            <td style="color: #1f2937; font-size: 14px;">${displayService}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                      <td style="padding-top: 25px;">
                        <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                          💬 Nội Dung Tin Nhắn
                        </h3>
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
                          <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    🕐 Nhận lúc: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                  </p>
                  <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 11px;">
                    Email tự động từ website <strong>Hitek Flycam</strong>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // -------------------- SAVE TO DATABASE --------------------
    const { data: saved, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        location: data.location,
        service: data.service,
        message: data.message,
        status: "pending",
      })
      .select();

    // -------------------- SEND EMAIL TO ADMIN ONLY --------------------
    await sendSMTP(adminEmail, adminHtml, "📩 New Contact Submission");

    return cors(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );

  } catch (err) {
    return cors(
      new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      })
    );
  }
});
