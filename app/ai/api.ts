import {createFactory} from 'axios-interface';
import {format, subDays, subMonths} from 'date-fns';
import {R, ParamsDaily, ParamsTsCode, Daily} from './apiTypes';

const {createInterface} = createFactory();

export const apiGetHealth = createInterface<void, R>(
    'GET',
    '/api/health',
);

export const apiGetDaily = createInterface<ParamsDaily, R<Daily[]>>(
    'GET',
    '/api/daily',
);

export const apiGetNearestWeekDaily = (params: ParamsTsCode) => {
    const now = new Date();
    // 股票数据通常滞后一天，所以结束日期设为昨天
    const endDate = subDays(now, 1);
    const startDate = subDays(now, 7);

    return apiGetDaily({
        ts_code: params.ts_code,
        start_date: format(startDate, 'yyyyMMdd'),
        end_date: format(endDate, 'yyyyMMdd'),
    });
};

export const apiGetNearestMonthDaily = (params: ParamsTsCode) => {
    const now = new Date();
    // 股票数据通常滞后一天，所以结束日期设为昨天
    const endDate = subDays(now, 1);
    const startDate = subMonths(now, 1);

    return apiGetDaily({
        ts_code: params.ts_code,
        start_date: format(startDate, 'yyyyMMdd'),
        end_date: format(endDate, 'yyyyMMdd'),
    });
};
