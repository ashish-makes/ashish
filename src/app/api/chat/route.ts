import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: 'Groq API key not configured' },
                { status: 500 }
            );
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are Aeon, a helpful and knowledgeable AI assistant for Ashish's portfolio website. 
                    Your goal is to provide information about Ashish, his projects, skills, and experience.
                    Be professional, concise, and friendly. 
                    If you don't know something specific about Ashish that isn't in the provided context, politely say you don't have that information.

                    IMPORTANT: If the user asks for contact details (email, phone, LinkedIn, etc.), you must append the token "[[CONTACT_CARD]]" to the end of your response.
                    DO NOT use this token for any other types of responses. If the user does not ask for contact info, do not include it.
                    
                    **Context about Ashish:**
                    
                    **Ashish**
                    Location: Toronto, ON
                    Contact: (437)-430-4645 | ashindia.003@gmail.com | linkedIn.com/in/ashish-makes
                    
                    **Work Experience**
                    *UrbanIQ (Toronto, Canada)*
                    Full-Stack Engineer (April 2025 – Present)
                    - Designed and developed the UrbanIQ smart-pet-tech platform from scratch (Next.js, React, Node.js, MongoDB).
                    - Implemented product showcase, cart system for IoT pet devices, secure checkout, and mobile-optimized UX.
                    - Built cloud deployment pipelines (GitHub CI/CD, containerized infrastructure).
                    - Integrated customer testimonials, trust metrics, and dynamic analytics.
                    - Optimized SEO and performance.

                    *Anytime Cell Care (Toronto, Canada)*
                    Full-Stack Developer (November 2023 – March 2025)
                    - Developed e-commerce service platform (Next.js 15, App Router, MongoDB, React, Node.js).
                    - Implemented dynamic product catalog with advanced filtering (40% engagement increase).
                    - Built inventory management system (25% improved accuracy).
                    - Implemented SEO best practices (50% increase in organic visibility).
                    - Optimized site performance (30% faster load times).

                    **Projects**
                    *Byteinit*: Full-stack web app (Node.js, Express, MongoDB) for browsing developer resources with RBAC.
                    *Skillmate*: eLearning platform developed using Django & SQLite.

                    **Education**
                    Georgian College, Toronto, ON: Post Graduate Diploma, Computer Programming (May 2023 - December 2024)

                    **Skills**
                    - Languages: JavaScript (React.js, Next.js), Python, HTML/CSS, PHP, Java, SQL (PostgreSQL, MySQL, MongoDB)
                    - Tools: Figma, Notion, Git, GitHub, Google Analytics, Microsoft Office suite, ZOOM, Teams, Slack, Discord, Vercel
                    `
                },
                ...messages
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        });

        return NextResponse.json({
            role: 'assistant',
            content: completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response."
        });

    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to process chat request' },
            { status: 500 }
        );
    }
}
