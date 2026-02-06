import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// API route to handle contact form submissions
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // 1. Save to database
        const contactSubmission = await prisma.contact.create({
            data: {
                name,
                email,
                message,
            },
        });

        // 2. Forward to email via Resend (Notification to Admin)
        try {
            await resend.emails.send({
                from: 'Portfolio Contact <onboarding@resend.dev>',
                to: 'ashindia.003@gmail.com',
                subject: `New Contact Form Submission: ${name}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #111; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message from Portfolio</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
                            ${message.replace(/\n/g, '<br/>')}
                        </div>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">This message was submitted via the contact form on your portfolio website.</p>
                    </div>
                `,
            });
        } catch (emailError) {
            console.error('Admin notification failed:', emailError);
        }

        // 3. Auto-reply to Visitor
        try {
            await resend.emails.send({
                from: 'Ashish <onboarding@resend.dev>',
                to: email,
                subject: `Thank you for reaching out, ${name}!`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #111; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Thank you for your message!</h2>
                        <p>Hi ${name},</p>
                        <p>Thanks for reaching out through my portfolio. I've received your message and wanted to let you know that I'll be reviewing it shortly.</p>
                        <p>I typically respond within 24-48 hours. If you need anything urgently, feel free to connect with me on LinkedIn.</p>
                        <br/>
                        <p>Best regards,</p>
                        <p><strong>Ashish</strong></p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated confirmation of your message submission at ashish.cv</p>
                    </div>
                `,
            });
        } catch (autoReplyError) {
            console.error('Auto-reply failed:', autoReplyError);
        }

        return NextResponse.json(
            { message: 'Message sent successfully', id: contactSubmission.id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
