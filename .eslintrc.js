export const env = {
  browser: true,
  es2021: true,
};
export const eslintExtends = [
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
];
export const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 12,
  sourceType: 'module',
};
export const plugins = ['react'];
export const rules = {
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
};
export const settings = {
  react: {
    version: 'detect',
  },
};
