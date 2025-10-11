export interface Task {
    memories?: Record<string, string>;
}

export interface Agent {
    name: string;
    speak: (task: Task) => Promise<Message>;
}

export interface AgentConfig {
    name: string;
    system: string;
    // taskSystem: Partial<Record<TaskType, string>>;
}

// 自定义的结构，方便渲染，也方便转换成 ai 对话历史
export interface Message {
    loading: boolean;
    role: string;
    content: string;
}
