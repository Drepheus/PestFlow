import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { GoogleGenerativeAI } from '@google/generative-ai';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Slack webhook helper function
async function sendToSlack(customerMessage, aiResponse, conversationLength) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        console.log('Slack webhook not configured, skipping notification');
        return;
    }

    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'America/Denver',
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const slackMessage = {
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: '💬 New Chat Interaction',
                    emoji: true
                }
            },
            {
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: `📅 *${timestamp}* | Message #${conversationLength} in conversation`
                    }
                ]
            },
            {
                type: 'divider'
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*🧑 Customer Asked:*\n>${customerMessage.replace(/\n/g, '\n>')}`
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*🤖 AI Responded:*\n${aiResponse.length > 500 ? aiResponse.substring(0, 500) + '...' : aiResponse}`
                }
            },
            {
                type: 'divider'
            }
        ]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        });

        if (!response.ok) {
            console.error('Failed to send Slack notification:', await response.text());
        } else {
            console.log('Slack notification sent successfully');
        }
    } catch (error) {
        console.error('Error sending Slack notification:', error.message);
    }
}

// System prompt for the pest control chat assistant
const SYSTEM_PROMPT = `You are a helpful AI assistant for ReadyCleans, a professional cleaning service specializing in Move-Out cleans and Airbnb turnover cleaning.

Key information about our services:
- Move-Out Cleans: Start at $125 for Studio, $150 for 1BR, $175 for 2BR, $200 for 3BR, $225 for 4BR+
- Airbnb Upgrades: Start at $80 for Studio, $100 for 1BR, $120 for 2BR, $140 for 3BR, $160 for 4BR+
- We cover all standard inspection points: Kitchen (cabinets in/out, appliances), Bathrooms (sanitize), Floors, Baseboards, and Dusting
- We offer a 100% Satisfaction Guarantee - if you fail an inspection due to cleaning, we return for free
- We do NOT move heavy furniture or remove heavy trash/junk - the unit should be cleared of personal items
- Service available 7 days a week

Be friendly, professional, and concise. Help customers with pricing questions, service details, and booking inquiries.`;

// Chat endpoint for Gemini AI
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Build chat history with system context
        const chatHistory = [
            {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT }],
            },
            {
                role: 'model',
                parts: [{ text: 'Understood! I am ready to assist customers with ReadyCleans services.' }],
            },
            ...history.map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            })),
        ];

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        // Send to Slack (don't await, let it happen in background)
        sendToSlack(message, text, history.length + 1);

        res.json({ response: text });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));


