import {Button} from '@/ui/button';
import {Input} from '@/ui/input';
import {Badge} from '@/ui/badge';
import {Play, Square} from 'lucide-react';
import {resetConversation, useTopic, setTopic} from '../process/conversation';
import {main} from '../process/main';
import {useState} from 'react';

// 智能体配置
const agents = [
    {name: '基本面分析师', color: 'bg-blue-500'},
    {name: '技术分析师', color: 'bg-green-500'},
    {name: '激进分析师', color: 'bg-red-500'},
    {name: '保守分析师', color: 'bg-yellow-500'},
    {name: '中立分析师', color: 'bg-purple-500'},
    {name: '风险经理', color: 'bg-orange-500'},
];

export const ButtonGroup = () => {
    const topic = useTopic();
    const [isRunning, setIsRunning] = useState(false);
    const [inputTopic, setInputTopic] = useState('');

    const handleStart = async () => {
        if (!inputTopic.trim()) {
            return;
        }

        setTopic(inputTopic.trim());
        setIsRunning(true);
        try {
            await main();
        }
        finally {
            setIsRunning(false);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        // TODO: 添加停止逻辑
    };

    const handleReset = () => {
        resetConversation();
        setInputTopic('');
        setIsRunning(false);
    };

    return (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="输入分析主题（如：贵州茅台、比亚迪、宁德时代等）..."
                            value={inputTopic}
                            onChange={e => setInputTopic(e.target.value)}
                            disabled={isRunning}
                            className="max-w-md"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {!isRunning ? (
                            <>
                                <Button onClick={handleStart} disabled={!inputTopic.trim()} className="flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    开始分析
                                </Button>
                                <Button onClick={handleReset} variant="outline">
                                    清除
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleStop} variant="destructive" className="flex items-center gap-2">
                                <Square className="w-4 h-4" />
                                停止分析
                            </Button>
                        )}
                    </div>
                </div>

                {/* 智能体状态指示器 */}
                {topic && (
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-muted-foreground">参与智能体：</span>
                        {agents.map(agent => (
                            <Badge
                                key={agent.name}
                                variant="secondary"
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
    );
};
