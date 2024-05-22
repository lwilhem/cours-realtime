import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,

  rules: {
    'no-console': 'off',
    'eqeqeq': 'off',
    'ts/no-use-before-define': 'off',
  },
})
