// import {createFireworks} from '@ai-sdk/fireworks';
import {createOpenRouter} from '@openrouter/ai-sdk-provider';

// https://fireworks.ai/models
// const fireworks = createFireworks({
//     apiKey: process.env.NEXT_PUBLIC_FIREWORKS_API_KEY,
// });

// https://openrouter.ai/models
export const openrouter = createOpenRouter({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

export const models: string[] = [
    'deepseek/deepseek-v3.1-terminus', // 经常泄露内部指令
    // 'openai/gpt-5-chat', // 不支持 tools
    'google/gemini-2.5-flash-lite',
    // 'x-ai/grok-4-fast', // 似乎有问题
    'anthropic/claude-sonnet-4.5', // 太贵
];
