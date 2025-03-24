import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

import { getSystemPrompt } from "./utilities";
const client = new OpenAI();
import { updateChat } from "./chats";

const schema = z.object({
    response: z.string(),
    appointmentRequested: z.boolean(),
});

export async function generateResponse (chatId: number, messages: any, res: any) {
    console.log("generating response");
    try {
        const updatedMessages = [getSystemPrompt(), ...messages];
        const stream = await client.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: updatedMessages,
            stream: true,
        });

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        let result = "";
        // Stream each chunk back to the client
        for await (const chunk of stream) {
            //console.log('Chunk:', JSON.stringify(chunk, null, 2));
            const content = chunk.choices[0].delta.content;
            if (content) {
                result += content;
                const responseChunk = {
                    content: content,
                    finish_reason: chunk.choices[0].finish_reason,
                    // Send raw content including newlines and markdown
                    raw_content: content.replace(/\n/g, '\\n') 
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





