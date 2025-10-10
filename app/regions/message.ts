import {createMappedRegion} from 'region-react';
import {Message} from '@/types/types';

const messageRegion = createMappedRegion<number, Message>();

export const getMessage = messageRegion.getValue;
export const useMessage = messageRegion.useValue;
export const setMessage = messageRegion.set;
export const resetAllMessage = messageRegion.resetAll;
