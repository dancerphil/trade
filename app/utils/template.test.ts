import {describe, test, expect} from 'vitest';
import {template} from './template';

describe('template', () => {
    test('replaces \'{{a}}\' with provided value', () => {
        expect(template('{{a}}', {a: 'x'})).toBe('x');
    });

    test('recursive replace', () => {
        expect(template('{{a}}', {a: '{{b}}', b: 'y'})).toBe('y');
    });
});
