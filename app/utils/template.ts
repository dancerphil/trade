import {template as _template} from 'lodash-es';
import {defaultPromptInterpolate} from '@/constants/promptInterpolate';

const interpolate = defaultPromptInterpolate;

export function template(str: string, data: Record<string, string>) {
    let current = str;
    while (current.match(interpolate)) {
        const compiled = _template(current, {interpolate});
        const next = compiled(data);
        if (next === current) {
            return next;
        }
        current = next;
    }
    return current;
}
