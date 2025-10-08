interface TaskConfig {
    id: string;
    name: string;
    inputs: string[];
    output: string;
    prompt: string;
}

export interface AgentConfig {
    id: string;
    name: string;
    tasks: TaskConfig[];
}

export interface PromptConfig {
    name: string;
    value: string;
}

export interface Scene {
    agents: AgentConfig[];
    promptSegments: PromptConfig[];
    promptInterpolate: string; // {{}}
}
