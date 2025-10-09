const observer = new MutationObserver((mutations) => {
    const endDom = document.getElementById('scroll-end');
    if (!endDom) {
        return;
    }
    let shouldScroll = false;

    mutations.forEach((mutation) => {
        // 检查是否有文本内容变化
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            shouldScroll = true;
        }
    });
    if (shouldScroll) {
        endDom.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }
});

let lastScrollTop = 0;

const handleScroll = () => {
    const currentScrollTop = document.documentElement.scrollTop;
    const diff = currentScrollTop - lastScrollTop;
    lastScrollTop = currentScrollTop;

    if (diff < -1) {
        console.log('autoscroll disconnected');
        observer.disconnect();
        document.removeEventListener('scroll', handleScroll);
    }
};

const startAutoScroll = () => {
    const containerDom = document.getElementById('scroll-container');
    if (!containerDom) {
        return;
    }
    document.addEventListener('scroll', handleScroll, {passive: true});
    observer.observe(containerDom, {
        childList: true,
        subtree: true,
        characterData: true,
    });
};

startAutoScroll();

export {};
