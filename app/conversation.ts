import {createMappedRegion, createRegion} from 'region-core';
import {Message} from './types';
import {ModelMessage, StreamTextResult} from 'ai';

// round = length -1
const currentRoundRegion = createRegion<number>(-1);

const getRound = currentRoundRegion.getValue;

export const useRound = currentRoundRegion.useValue;

const messageRegion = createMappedRegion<number, Message>();

const getMessage = messageRegion.getValue;

export const useMessage = messageRegion.useValue;

export const getConversation = (currentRole: string) => {
    const round = getRound();
    const conversation: ModelMessage[] = [];
    for (let i = 0; i <= round; i++) {
        const {role, content} = getMessage(i);
        const isCurrent = role === currentRole;
        conversation.push({
            role: isCurrent ? 'assistant' : 'user',
            // 当把 role 加入 content 时，模型就会学着生成角色名，所以还是让模型通过上下文判断
            content,
        });
    }
    return conversation;
};

export const appendMessage = (role: string, text?: string) => {
    currentRoundRegion.set(v => v + 1);
    const round = currentRoundRegion.getValue();
    messageRegion.set(round, {loading: false, role, content: text ?? ''});
};

export const appendStream = async (role: string, streamResult: StreamTextResult<any, any>) => {
    currentRoundRegion.set(v => v + 1);
    const round = currentRoundRegion.getValue();
    messageRegion.set(round, {loading: true, role, content: ''});
    const {textStream} = streamResult;
    for await (const textPart of textStream) {
        messageRegion.set(round, message => ({
            ...message,
            content: message.content + textPart,
        }));
    }
    messageRegion.set(round, message => ({
        ...message,
        loading: false,
    }));
};

export const hostSpeak = (text: string) => {
    appendMessage('主持人', text);
};

export const resetConversation = () => {
    currentRoundRegion.reset();
    messageRegion.resetAll();
};

if (import.meta.hot) {
    import.meta.hot.accept(() => {
        resetConversation();
    });
}
