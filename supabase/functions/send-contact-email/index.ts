import { serve } from "https://deno.land/std@0.223.0/http/server.ts";

serve(async (req) => {
  try {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    const data = await req.json();

    const smtpHost = Deno.env.get("SMTP_HOST")!;
    const smtpPort = Number(Deno.env.get("SMTP_PORT")!);
    const smtpUser = Deno.env.get("SMTP_USER")!;
    const smtpPass = Deno.env.get("SMTP_PASS")!;
    const secure = Deno.env.get("SMTP_SECURE") === "true";

    console.log("📡 Connecting to SMTP:", smtpHost, smtpPort, secure);

    // CONNECT
    const conn = secure
      ? await Deno.connectTls({ hostname: smtpHost, port: smtpPort })
      : await Deno.connect({ hostname: smtpHost, port: smtpPort });

    async function smtp(cmd: string) {
      console.log("➡️", cmd);
      await conn.write(encoder.encode(cmd + "\r\n"));
      const buf = new Uint8Array(4096);
      const n = await conn.read(buf);
      const res = decoder.decode(buf.subarray(0, n));
      console.log("⬅️", res);
      return res;
    }

    // SMTP handshake
    await smtp("EHLO localhost");
    await smtp("AUTH LOGIN");
    await smtp(btoa(smtpUser));
    await smtp(btoa(smtpPass));

    await smtp(`MAIL FROM:<${smtpUser}>`);
    await smtp(`RCPT TO:<${Deno.env.get("ADMIN_EMAIL") || smtpUser}>`);

    await smtp("DATA");

    const body = `
Subject: New Contact Submission
Content-Type: text/html

<p><b>Name:</b> ${data.name}</p>
<p><b>Email:</b> ${data.email}</p>
<p><b>Phone:</b> ${data.phone}</p>
<p><b>Message:</b> ${data.message}</p>
`;

    await smtp(body + "\r\n.");
    await smtp("QUIT");

    conn.close();

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("❌ ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
