import {defaultPromptInterpolate} from '@/constants/promptInterpolate';

const interpolate = defaultPromptInterpolate;

export function template(str: string, data: Record<string, string>) {
    let current = str;

    while (current.match(interpolate)) {
        const next = current.replace(
            interpolate,
            // (match, name) => data[name] ?? match,
            (match, name) => data[name] ?? '[缺失]',
        );
        if (next === current) {
            return next;
        }
        current = next;
    }

    return current;
}
