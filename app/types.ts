import {ModelMessage} from 'ai';

export type TaskType = '闲聊' | '分析' | '辩论' | '总结';

export interface Task {
    type: TaskType;
}

export interface Agent {
    name: string;
    speak: (task?: Task) => Promise<void>;
}

export interface System {
    角色: string;
    团队背景: string;
    讨论背景: string;
    原则: string;
}

export interface AgentConfig {
    name: string;
    system: Partial<System>;
    taskSystem?: Partial<Record<TaskType, string>>;
}

// 自定义的结构，方便渲染，也方便转换成 ai 对话历史
export interface Message {
    loading: boolean;
    role: string;
    content: string;
}

export type ConversationMessage = Omit<ModelMessage, 'id'>;
