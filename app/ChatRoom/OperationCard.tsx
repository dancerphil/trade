import {Button} from '@/ui/button';
import {Badge} from '@/ui/badge';
import {Play} from 'lucide-react';
import {downloadConversation, resetConversation} from '@/process/conversation';
import {main} from '@/process/main';
import {Card} from '@/ui/card';
import {useProcess} from '@/regions/process';
import {StockSelect} from '@/components/StockSelect';
import {ModelSelect} from '@/components/ModelSelect';

// 智能体配置
const agents = [
    {name: '基本面分析师', color: 'bg-blue-500'},
    {name: '技术分析师', color: 'bg-green-500'},
    {name: '激进分析师', color: 'bg-red-500'},
    {name: '保守分析师', color: 'bg-yellow-500'},
    {name: '中立分析师', color: 'bg-purple-500'},
    {name: '交易经理', color: 'bg-orange-500'},
];

interface Props {
    type: 'start' | 'end';
}

export const OperationCard = ({type}: Props) => {
    const {status, topic} = useProcess();
    const isRunning = status === 'RUNNING';

    const handleStart = async () => {
        main();
    };

    const handleReset = () => {
        resetConversation();
    };

    return (
        <Card className="p-4">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <StockSelect />
                    </div>
                    <div className="flex-1">
                        <ModelSelect />
                    </div>
                    <div className="flex items-center gap-2">
                        {isRunning ? null : (
                            <>
                                {type === 'end' && (
                                    <>
                                        <Button onClick={downloadConversation} variant="outline">
                                            导出对话
                                        </Button>
                                        <Button onClick={handleReset} variant="outline">
                                            清除
                                        </Button>
                                    </>
                                )}
                                <Button onClick={handleStart} disabled={!topic} className="flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    开始分析
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* 智能体状态指示器 */}
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
            </div>
        </Card>
    );
};
