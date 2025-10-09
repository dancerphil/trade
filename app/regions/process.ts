import {createRegion} from 'region-react';

interface Process {
    round: number;
    topic: string;
    status: 'WAITING' | 'RUNNING' | 'SUCCESS';
}

const defaultProcess: Process = {
    // round = length -1
    round: -1,
    topic: '贵州茅台',
    status: 'WAITING',
};

const processRegion = createRegion<Process>(defaultProcess);

export const getProcess = processRegion.getValue;
export const useProcess = processRegion.useValue;
export const setProcess = processRegion.set;
export const resetProcess = processRegion.reset;
