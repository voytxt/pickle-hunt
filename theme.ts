import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
  name: 'theme',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': 'system-ui',
    '--theme-font-family-heading': 'system-ui',
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '8px',
    '--theme-rounded-container': '8px',
    '--theme-border-base': '1px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '255 255 255',
    '--on-secondary': '255 255 255',
    '--on-tertiary': '0 0 0',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '0 0 0',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #3b82f6
    '--color-primary-50': '226 236 254', // #e2ecfe
    '--color-primary-100': '216 230 253', // #d8e6fd
    '--color-primary-200': '206 224 253', // #cee0fd
    '--color-primary-300': '177 205 251', // #b1cdfb
    '--color-primary-400': '118 168 249', // #76a8f9
    '--color-primary-500': '59 130 246', // #3b82f6
    '--color-primary-600': '53 117 221', // #3575dd
    '--color-primary-700': '44 98 185', // #2c62b9
    '--color-primary-800': '35 78 148', // #234e94
    '--color-primary-900': '29 64 121', // #1d4079
    // secondary | #a855f7
    '--color-secondary-50': '242 230 254', // #f2e6fe
    '--color-secondary-100': '238 221 253', // #eeddfd
    '--color-secondary-200': '233 213 253', // #e9d5fd
    '--color-secondary-300': '220 187 252', // #dcbbfc
    '--color-secondary-400': '194 136 249', // #c288f9
    '--color-secondary-500': '168 85 247', // #a855f7
    '--color-secondary-600': '151 77 222', // #974dde
    '--color-secondary-700': '126 64 185', // #7e40b9
    '--color-secondary-800': '101 51 148', // #653394
    '--color-secondary-900': '82 42 121', // #522a79
    // tertiary | #ffffff
    '--color-tertiary-50': '255 255 255', // #ffffff
    '--color-tertiary-100': '255 255 255', // #ffffff
    '--color-tertiary-200': '255 255 255', // #ffffff
    '--color-tertiary-300': '255 255 255', // #ffffff
    '--color-tertiary-400': '255 255 255', // #ffffff
    '--color-tertiary-500': '255 255 255', // #ffffff
    '--color-tertiary-600': '230 230 230', // #e6e6e6
    '--color-tertiary-700': '191 191 191', // #bfbfbf
    '--color-tertiary-800': '153 153 153', // #999999
    '--color-tertiary-900': '125 125 125', // #7d7d7d
    // success | #22c55e
    '--color-success-50': '222 246 231', // #def6e7
    '--color-success-100': '211 243 223', // #d3f3df
    '--color-success-200': '200 241 215', // #c8f1d7
    '--color-success-300': '167 232 191', // #a7e8bf
    '--color-success-400': '100 214 142', // #64d68e
    '--color-success-500': '34 197 94', // #22c55e
    '--color-success-600': '31 177 85', // #1fb155
    '--color-success-700': '26 148 71', // #1a9447
    '--color-success-800': '20 118 56', // #147638
    '--color-success-900': '17 97 46', // #11612e
    // warning | #ffffff
    '--color-warning-50': '255 255 255', // #ffffff
    '--color-warning-100': '255 255 255', // #ffffff
    '--color-warning-200': '255 255 255', // #ffffff
    '--color-warning-300': '255 255 255', // #ffffff
    '--color-warning-400': '255 255 255', // #ffffff
    '--color-warning-500': '255 255 255', // #ffffff
    '--color-warning-600': '230 230 230', // #e6e6e6
    '--color-warning-700': '191 191 191', // #bfbfbf
    '--color-warning-800': '153 153 153', // #999999
    '--color-warning-900': '125 125 125', // #7d7d7d
    // error | #ffffff
    '--color-error-50': '255 255 255', // #ffffff
    '--color-error-100': '255 255 255', // #ffffff
    '--color-error-200': '255 255 255', // #ffffff
    '--color-error-300': '255 255 255', // #ffffff
    '--color-error-400': '255 255 255', // #ffffff
    '--color-error-500': '255 255 255', // #ffffff
    '--color-error-600': '230 230 230', // #e6e6e6
    '--color-error-700': '191 191 191', // #bfbfbf
    '--color-error-800': '153 153 153', // #999999
    '--color-error-900': '125 125 125', // #7d7d7d
    // surface | #694475
    '--color-surface-50': '233 227 234', // #e9e3ea
    '--color-surface-100': '225 218 227', // #e1dae3
    '--color-surface-200': '218 208 221', // #dad0dd
    '--color-surface-300': '195 180 200', // #c3b4c8
    '--color-surface-400': '150 124 158', // #967c9e
    '--color-surface-500': '105 68 117', // #694475
    '--color-surface-600': '95 61 105', // #5f3d69
    '--color-surface-700': '79 51 88', // #4f3358
    '--color-surface-800': '63 41 70', // #3f2946
    '--color-surface-900': '51 33 57', // #332139
  },
};
