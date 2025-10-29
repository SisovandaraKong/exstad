/** @format */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
	try {
		const { name, email, subject, message } = await request.json();

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		// Check if environment variables are set
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
			console.error("Email credentials not configured");
			return NextResponse.json(
				{ error: "Email service not configured" },
				{ status: 500 }
			);
		}

		// Create transporter (you'll need to configure this with your email service)
		const transporter = nodemailer.createTransport({
			// For Gmail (you can change this to your preferred email service)
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER, // Your email address
				pass: process.env.EMAIL_PASS, // Your email password or app password
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: "info@exstad.edu.kh",
			subject: `Contact Form: ${subject}`,
			html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>This email was sent from the exSTAD website contact form.</small></p>
      `,
			// Also send a plain text version
			text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        This email was sent from the exSTAD website contact form.
      `,
			// Set reply-to as the sender's email
			replyTo: email,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Email sending error:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
