import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_OWNER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
  
    await transporter.sendMail({
      from: email,
      to: process.env.USER_OWNER_EMAIL,
      subject: `New Message from ${name}`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
      
      <div style="background-color: #007bff; padding: 20px; text-align: center;">
        <img src="https://your-domain.com/logo.png" alt="Company Logo" style="max-height: 50px; margin-bottom: 10px;">
        <h2 style="color: #ffffff; margin: 0; font-weight: 500;">New Inquiry Received</h2>
      </div>

      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #555;">You have received a new message via your website contact form. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f4; width: 100px;"><strong>Name:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f4; color: #007bff; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f4;"><strong>Email:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f4;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #007bff; border-radius: 4px;">
          <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Message Content:</p>
          <p style="margin: 0; font-style: italic; color: #666;">"${message}"</p>
        </div>
      </div>

      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        <p style="margin: 0;">This email was automatically generated from your website's contact form.</p>
        <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
      </div>
    </div>
  `,
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
