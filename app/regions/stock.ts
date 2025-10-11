import {createRegion} from 'region-react';
import {apiGetStock} from '@/ai/api';
import {Stock} from '@/ai/apiTypes';

export const stocksRegion = createRegion<Stock[]>([]);

export const useStocks = stocksRegion.useValue;
export const useStocksLoading = stocksRegion.useLoading;
export const loadStocks = stocksRegion.loadBy(
    apiGetStock,
);
