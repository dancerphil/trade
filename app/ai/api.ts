import {createFactory} from 'axios-interface';
import {format, subDays, subMonths} from 'date-fns';
import {ParamsDaily, ParamsTsCode, Daily, DailyBasic, Stock} from './apiTypes';

const {createInterface} = createFactory({
    onResolve: response => response.data.data,
});

export const apiGetHealth = createInterface<void, void>(
    'GET',
    '/api/health',
);

export const apiGetStock = createInterface<void, Stock[]>(
    'GET',
    '/api/stock',
);

export const apiGetDaily = createInterface<ParamsDaily, Daily[]>(
    'GET',
    '/api/daily',
);

export const apiGetNearestDailyOfWeek = (params: ParamsTsCode) => {
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

export const apiGetNearestDailyOfMonth = (params: ParamsTsCode) => {
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

export const apiGetDailyBasic = createInterface<ParamsDaily, DailyBasic[]>(
    'GET',
    '/api/daily_basic',
);

export const apiGetNearestDailyBasicOfWeek = (params: ParamsTsCode) => {
    const now = new Date();
    // 股票数据通常滞后一天，所以结束日期设为昨天
    const endDate = subDays(now, 1);
    const startDate = subDays(now, 7);

    return apiGetDailyBasic({
        ts_code: params.ts_code,
        start_date: format(startDate, 'yyyyMMdd'),
        end_date: format(endDate, 'yyyyMMdd'),
    });
};

export const apiGetNearestDailyBasicOfMonth = (params: ParamsTsCode) => {
    const now = new Date();
    // 股票数据通常滞后一天，所以结束日期设为昨天
    const endDate = subDays(now, 1);
    const startDate = subMonths(now, 1);

    return apiGetDailyBasic({
        ts_code: params.ts_code,
        start_date: format(startDate, 'yyyyMMdd'),
        end_date: format(endDate, 'yyyyMMdd'),
    });
};
