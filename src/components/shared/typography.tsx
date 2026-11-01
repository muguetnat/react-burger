const TypographyType = {
  default: 'text text_type_main-default',
  large: 'text text_type_main-large',
  medium: 'text text_type_main-medium',
  small: 'text text_type_main-small',
  inactive_color: 'text text_type_main-default text_color_inactive',
  digits_default: 'text text_type_digits-default',
  digits_medium: 'text text_type_digits-medium',
  digits_large: 'text text_type_digits-large',
};

type TypographyProps = {
  type: keyof typeof TypographyType;
  text: string;
  extraClass?: string;
};

export default function Typography({ type, text, extraClass }: TypographyProps) {
  return <div className={`${TypographyType[type]} ${extraClass}`}>{text}</div>;
}
