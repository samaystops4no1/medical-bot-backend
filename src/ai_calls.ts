import OpenAI from "openai";
import { getSystemPrompt } from "./utilities";
import { updateChat, Message } from "./chats";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function generateResponse (chatId: number, messages: Message[], res: any) {
    try {
        const updatedMessages = [getSystemPrompt(), ...messages];
        const stream = await client.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: updatedMessages as ChatCompletionMessageParam[],
            stream: true,
        });

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        let result = "";
        // Stream each chunk back to the client
        for await (const chunk of stream) {
            const content = chunk.choices[0].delta.content;
            if (content) {
                result += content;
                const responseChunk = {
                    content: content,
                    finish_reason: chunk.choices[0].finish_reason,
                }
                res.write(`data: ${JSON.stringify(responseChunk)}\n\n`);
            }
        }
        updateChat(chatId, [...messages, {role: "assistant", content: result}]);
        res.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while generating the response' });
    }
}





