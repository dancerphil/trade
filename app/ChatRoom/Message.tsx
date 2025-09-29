import {Card} from '@/ui/card';
import {Badge} from '@/ui/badge';
import {Markdown} from '@/components/Markdown';
import {IconMessage} from '@/icons';
import {useMessage} from './conversation';

// 智能体颜色配置
const agentColors: Record<string, string> = {
    主持人: 'bg-gray-500',
    基本面分析师: 'bg-blue-500',
    技术分析师: 'bg-green-500',
    激进分析师: 'bg-red-500',
    保守分析师: 'bg-yellow-500',
    中立分析师: 'bg-purple-500',
    风险经理: 'bg-orange-500',
};

interface Props {
    round: number;
}

export const Message = ({round}: Props) => {
    const {loading, role, content} = useMessage(round);
    const agentColor = agentColors[role] || 'bg-gray-500';

    return (
        <Card className="p-4">
            <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${agentColor} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                    {role.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-foreground">{role}</h3>
                        {loading && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <IconMessage className="w-3 h-3 animate-pulse" />
                                思考中...
                            </Badge>
                        )}
                    </div>
                    <div className="text-foreground leading-relaxed">
                        <Markdown>{content}</Markdown>
                    </div>
                </div>
            </div>
        </Card>
    );
};
