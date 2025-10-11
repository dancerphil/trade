// import {createFireworks} from '@ai-sdk/fireworks';
import {createOpenRouter} from '@openrouter/ai-sdk-provider';

// https://fireworks.ai/models
// const fireworks = createFireworks({
//     apiKey: process.env.NEXT_PUBLIC_FIREWORKS_API_KEY,
// });

// https://openrouter.ai/models
const openrouter = createOpenRouter({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

// export const deepseek = fireworks('accounts/fireworks/models/deepseek-v3');

// 经常泄露内部指令
export const deepseek = openrouter('deepseek/deepseek-v3.1-terminus');

// 不支持 tools
export const gpt5 = openrouter('openai/gpt-5-chat');

export const gemini = openrouter('google/gemini-2.5-flash-lite');

// 似乎有问题
export const grok = openrouter('x-ai/grok-4-fast');

// 太贵
export const claude = openrouter('anthropic/claude-sonnet-4.5');

export const model = claude;
