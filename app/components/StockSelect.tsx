import {Select} from 'antd';
import {setProcess, useProcess} from '@/regions/process';
import {useStocks, useStocksLoading} from '@/regions/stock';
import {Stock} from '@/ai/apiTypes';

const handleChange = (topic: string) => {
    setProcess(process => ({...process, topic}));
};

// 自定义搜索过滤函数，支持拼音搜索
const filterOption = (input: string, option: any) => {
    const searchText = input.toLowerCase();
    const stock: Stock = option.stock;
    const {name, ts_code, cnspell} = stock;

    // 支持按股票名称、代码、拼音缩写搜索
    return (
        name.toLowerCase().includes(searchText)
        || ts_code.toLowerCase().includes(searchText)
        || cnspell.toLowerCase().includes(searchText)
    );
};

export const StockSelect = () => {
    const loading = useStocksLoading();
    const stocks = useStocks();
    const {status, topic} = useProcess();
    const isRunning = status === 'RUNNING';

    return (
        <Select<string>
            showSearch
            className="w-full"
            value={topic}
            onChange={handleChange}
            loading={loading}
            disabled={isRunning}
            placeholder="输入分析主题（如：贵州茅台、比亚迪、宁德时代等）..."
            optionLabelProp="topic"
            filterOption={filterOption}
            options={stocks.map((stock) => {
                const {ts_code, name, cnspell} = stock;
                const topic = `${name}（${ts_code}）`;
                return {
                    value: topic,
                    label: `${name}（${ts_code}）${cnspell}`,
                    topic,
                    stock,
                };
            })}
        />
    );
};
