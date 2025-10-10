import {StreamTextResult} from 'ai';
import {getProcess, resetProcess, setProcess} from '@/regions/process';
import {getMessage, resetAllMessage, setMessage} from '@/regions/message';

export const downloadConversation = () => {
    const {round} = getProcess();
    const outputs: string[] = [];
    for (let i = 0; i <= round; i++) {
        const {role, content} = getMessage(i);
        outputs.push(`## ${role}`);
        outputs.push(content);
    }
    const output = outputs.join('\n\n');
    const blob = new Blob([output], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.md';
    a.click();
    URL.revokeObjectURL(url);
};

export const appendMessage = (role: string, text?: string) => {
    setProcess(process => ({...process, round: process.round + 1}));
    const {round} = getProcess();
    setMessage(round, {loading: false, role, content: text ?? ''});
};

export const appendStream = async (role: string, streamResult: StreamTextResult<any, any>) => {
    setProcess(process => ({...process, round: process.round + 1}));
    const {round} = getProcess();
    setMessage(round, {loading: true, role, content: ''});
    const {textStream} = streamResult;
    for await (const textPart of textStream) {
        setMessage(round, message => ({
            ...message,
            content: message.content + textPart,
        }));
    }
    setMessage(round, message => ({
        ...message,
        loading: false,
    }));
};

export const hostSpeak = (text: string) => {
    appendMessage('主持人', text);
};

export const resetConversation = () => {
    resetProcess();
    resetAllMessage();
};
