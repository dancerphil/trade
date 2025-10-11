import {useEffect, useMemo} from 'react';
import {useProcess} from '@/regions/process';
import {Message} from './Message';
import {OperationCard} from './OperationCard';

export const ChatRoom = () => {
    const {round, status} = useProcess();

    useEffect(
        () => {
            // 动态导入，确保只在客户端执行
            import('./mount');
        },
        [],
    );

    const rounds = useMemo(
        () => {
            const arr = [];
            for (let i = 0; i <= round; i++) {
                arr.push(i);
            }
            return arr;
        },
        [round],
    );

    return (
        <div id="scroll-container" className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-6 pb-20">
                <div className="space-y-4">
                    <OperationCard type="start" />
                    {rounds.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">输入分析主题并点击开始，观看多智能体的专业分析讨论</p>
                        </div>
                    )}
                    {rounds.map(r => <Message key={r} round={r} />)}
                    {status === 'SUCCESS' && <OperationCard type="end" />}
                </div>
            </div>
            {/* 用于滚动定位的隐藏元素 */}
            <div id="scroll-end" />
        </div>
    );
};
