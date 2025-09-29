'use client';
import {useMemo} from 'react';
import {useRound} from './conversation';
import {Message} from './Message';
import {ButtonGroup} from './ButtonGroup';

export const ChatRoom = () => {
    const round = useRound();

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
        <div className="min-h-screen bg-background">
            {/* 吸顶控制区域 */}
            <ButtonGroup />

            {/* 对话内容区域 */}
            <div className="container mx-auto px-4 py-6">
                {rounds.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">输入分析主题并点击开始，观看多智能体的专业分析讨论</p>
                    </div>
                )}

                <div className="space-y-4">
                    {rounds.map(r => <Message key={r} round={r} />)}
                </div>
            </div>
        </div>
    );
};
