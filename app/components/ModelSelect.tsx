import {Select} from 'antd';
import {setProcess, useProcess} from '@/regions/process';
import {models} from '@/ai/models';

const handleChange = (modelId: string) => {
    setProcess(process => ({...process, modelId}));
};

export const ModelSelect = () => {
    const {status, modelId} = useProcess();
    const isRunning = status === 'RUNNING';

    return (
        <Select<string>
            className="w-full"
            value={modelId}
            onChange={handleChange}
            disabled={isRunning}
            placeholder="选择 AI 模型..."
            options={models.map(modelId => ({value: modelId}))}
        />
    );
};
