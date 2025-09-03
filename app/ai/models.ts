import {createFireworks} from '@ai-sdk/fireworks';

// https://fireworks.ai/models
const fireworks = createFireworks({
    apiKey: process.env.NEXT_PUBLIC_FIREWORKS_API_KEY,
});

export const deepseek = fireworks('accounts/fireworks/models/deepseek-v3');

export const glm = fireworks('accounts/fireworks/models/glm-4p5');

export const fireFunction = fireworks('accounts/fireworks/models/llama-v3p1-70b-instruct');
