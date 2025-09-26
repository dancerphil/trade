import {reactConfig} from '@hero-u/eslint-config/react.js';

export default [
    ...reactConfig,
    {
        rules: {
            '@typescript-eslint/no-invalid-void-type': 'off',
        },
    },
];
