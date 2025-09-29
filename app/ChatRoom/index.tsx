'use client';
import {useMemo} from 'react';
import {useRound} from './conversation';
import {Message} from './Message';
import {ButtonGroup} from './ButtonGroup';
import {useAutoScroll} from './useAutoScroll';

export const ChatRoom = () => {
    const round = useRound();

    // 使用自动滚动Hook
    const {messagesEndRef, containerRef} = useAutoScroll({
        dependency: round,
    });

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
            <div ref={containerRef} className="container mx-auto px-4 pt-6 pb-20">
                {rounds.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">输入分析主题并点击开始，观看多智能体的专业分析讨论</p>
                    </div>
                )}
                <div className="space-y-4">
                    {rounds.map(r => <Message key={r} round={r} />)}
                </div>
            </div>
            {/* 用于滚动定位的隐藏元素 */}
            <div ref={messagesEndRef} />
        </div>
    );
};
