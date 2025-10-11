import {describe, test, expect} from 'vitest';
import {template} from './template';

describe('template', () => {
    test('基础', () => {
        expect(template('{{背景}}', {背景: '会议主题为贵州茅台'})).toBe('会议主题为贵州茅台');
    });

    test('递归', () => {
        expect(template('{{背景}}', {背景: '会议主题为{{主题}}', 主题: '贵州茅台'})).toBe('会议主题为贵州茅台');
    });

    test('递归，但值缺失了', () => {
        expect(template('{{背景}}', {背景: '会议主题为{{主题}}'})).toBe('会议主题为[缺失]');
    });

    test('regress', () => {
        const result = template(
            '{{背景}} & {{原则}}',
            {
                背景: '会议主题为{{主题}}',
                主题: '贵州茅台',
                原则: '以报告形式产出内容',
            },
        );
        // 现在返回了 [缺失]
        expect(result).toBe('会议主题为贵州茅台 & 以报告形式产出内容');
    });
});
