import theme from '../../../../theme.json';

export const styleTypeEnums = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export const weightEnums = {
  LIGHT: '300',
  REGULAR: '500',
  BOLD: '700',
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  800: '800',
  900: '900',
} as const;

export type StyleType = keyof typeof styleTypeEnums;
export type Weight = keyof typeof weightEnums | typeof weightEnums[keyof typeof weightEnums];

export const retrieveColorString = (
  styleType: StyleType = 'PRIMARY',
  weight: Weight = weightEnums[500]
): string | undefined => {
  let weightString: string;

  switch (weight) {
    case weightEnums.LIGHT:
      weightString = weightEnums.LIGHT;
      break;
    case weightEnums.REGULAR:
      weightString = weightEnums.REGULAR;
      break;
    case weightEnums.BOLD:
      weightString = weightEnums.BOLD;
      break;
    default:
      weightString = typeof weight === 'string' ? weight : weightEnums[weight];
  }

  const colorString = `color-${styleType.toLowerCase()}-${weightString}` as keyof typeof theme;
  return theme[colorString];
};
