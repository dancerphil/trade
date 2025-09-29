'use client';
/* eslint-disable max-lines */
import {useState} from 'react';
import {Button} from '@/ui/button';
import {Input} from '@/ui/input';
import {Card} from '@/ui/card';
import {Badge} from '@/ui/badge';
import {Play, Square} from 'lucide-react';

interface Message {
    id: string;
    agentName: string;
    agentRole: string;
    content: string;
    timestamp: Date;
}

interface Agent {
    name: string;
    role: string;
    color: string;
}

const defaultAgents: Agent[] = [
    {name: '分析师', role: 'analyst', color: 'bg-blue-500'},
    {name: '创意师', role: 'creative', color: 'bg-green-500'},
    {name: '评估师', role: 'evaluator', color: 'bg-purple-500'},
    {name: '决策者', role: 'decision-maker', color: 'bg-orange-500'},
];

export default function MultiAgentChat() {
    const [topic, setTopic] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentAgentIndex, setCurrentAgentIndex] = useState(0);

    const handleStart = () => {
        if (!topic.trim()) return;

        setIsRunning(true);
        setMessages([]);
        setCurrentAgentIndex(0);

        // 模拟智能体对话
        simulateConversation();
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const simulateConversation = () => {
        const sampleMessages = [
            {agent: 0, content: `让我来分析一下"${topic}"这个主题。从数据角度来看，我们需要考虑市场趋势和用户需求。`},
            {agent: 1, content: '基于分析师的观点，我认为我们可以从创新的角度来思考解决方案，比如采用新的设计理念。'},
            {agent: 2, content: '两位的想法都很有价值。让我评估一下可行性：技术实现难度中等，预期效果良好。'},
            {agent: 3, content: '综合大家的意见，我建议我们采用渐进式的方案，先从小规模试点开始。'},
        ];

        let messageIndex = 0;
        const interval = setInterval(() => {
            if (messageIndex >= sampleMessages.length) {
                setIsRunning(false);
                clearInterval(interval);
                return;
            }

            const sample = sampleMessages[messageIndex];
            const agent = defaultAgents[sample.agent];

            const newMessage: Message = {
                id: Date.now().toString(),
                agentName: agent.name,
                agentRole: agent.role,
                content: sample.content,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, newMessage]);
            setCurrentAgentIndex(sample.agent);
            messageIndex++;
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* 吸顶控制区域 */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="输入对话主题..."
                                value={topic}
                                onChange={e => setTopic(e.target.value)}
                                disabled={isRunning}
                                className="max-w-md"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {!isRunning ? (
                                <Button onClick={handleStart} disabled={!topic.trim()} className="flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    开始对话
                                </Button>
                            ) : (
                                <Button onClick={handleStop} variant="destructive" className="flex items-center gap-2">
                                    <Square className="w-4 h-4" />
                                    停止对话
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* 智能体状态指示器 */}
                    {topic && (
                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-muted-foreground">参与智能体：</span>
                            {defaultAgents.map((agent, index) => (
                                <Badge
                                    key={agent.role}
                                    variant={isRunning && currentAgentIndex === index ? 'default' : 'secondary'}
                                    className="flex items-center gap-1"
                                >
                                    <div className={`w-2 h-2 rounded-full ${agent.color}`} />
                                    {agent.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 对话内容区域 */}
            <div className="container mx-auto px-4 py-6">
                {messages.length === 0 && !isRunning && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">输入主题并点击开始，观看智能体们的精彩对话</p>
                    </div>
                )}

                <div className="space-y-4">
                    {messages.map((message) => {
                        const agent = defaultAgents.find(a => a.name === message.agentName);
                        return (
                            <Card key={message.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-full ${agent?.color} flex items-center justify-center text-white text-sm font-medium`}
                                    >
                                        {message.agentName.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-medium text-foreground">{message.agentName}</h3>
                                            <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-foreground leading-relaxed">{message.content}</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {isRunning && (
                    <div className="flex justify-center py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm">智能体正在思考中...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
