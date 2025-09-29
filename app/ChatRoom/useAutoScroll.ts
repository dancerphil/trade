import {useRef, useEffect, useCallback} from 'react';

interface UseAutoScrollOptions {
    /**
     * 触发自动滚动的依赖项，通常是消息轮次
     */
    dependency: number;
    /**
     * 滚动延迟时间（毫秒），确保DOM更新后再滚动
     */
    scrollDelay?: number;
    /**
     * 距离底部多少像素内认为用户在底部附近
     */
    bottomThreshold?: number;
}

/**
 * 自动滚动Hook
 * 支持新消息时自动滚动和流式输出时的实时滚动
 */
export const useAutoScroll = (options: UseAutoScrollOptions) => {
    const {
        dependency,
        scrollDelay = 100,
        bottomThreshold = 100,
    } = options;

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 自动滚动到底部的函数
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, []);

    // 检查用户是否在底部附近
    const isUserNearBottom = useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            return false;
        }

        const {scrollTop, scrollHeight, clientHeight} = container;
        return scrollHeight - scrollTop - clientHeight < bottomThreshold;
    }, [bottomThreshold]);

    // 当依赖项变化时（通常是新轮次），自动滚动到底部
    useEffect(() => {
        if (dependency >= 0) {
            const timer = setTimeout(scrollToBottom, scrollDelay);
            return () => clearTimeout(timer);
        }
    }, [dependency, scrollDelay, scrollToBottom]);

    // 监听消息内容变化，实现流式输出时的自动滚动
    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const observer = new MutationObserver((mutations) => {
            let shouldScroll = false;

            mutations.forEach((mutation) => {
                // 检查是否有文本内容变化
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    shouldScroll = true;
                }
            });

            if (shouldScroll && isUserNearBottom()) {
                scrollToBottom();
            }
        });

        observer.observe(containerRef.current, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => observer.disconnect();
    }, [isUserNearBottom, scrollToBottom]);

    return {
        messagesEndRef,
        containerRef,
        scrollToBottom,
    };
};
