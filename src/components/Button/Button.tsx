import {CText} from '@components/CText/CText';
import {colors, spacing} from '@utils/theme';
import React, {forwardRef} from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'neutral';
  children: string;
  styleText?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<TouchableOpacity, Props>(
  (
    {
      size = 'l',
      variant = 'primary',
      iconPosition = 'left',
      disabled,
      icon,
      style,
      children,
      styleText,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[
          stylesBtn.base,
          stylesBtn[size],
          stylesBtn[variant],
          disabled && stylesBtn.disabled,
          style,
        ]}
        activeOpacity={0.8}
        disabled={disabled}
        {...otherProps}>
        {iconPosition === 'left' && icon && (
          <Image style={stylesBtn.iconLeft} source={icon} />
        )}
        <CText
          style={[
            stylesText.base,
            stylesText[variant],
            stylesText[size],
            styleText,
          ]}
          allowFontScaling={false}>
          {children}
        </CText>
        {iconPosition === 'right' && icon && (
          <Image style={stylesBtn.iconRight} source={icon} />
        )}
      </TouchableOpacity>
    );
  },
);

export const BUTTON = {
  fontSize: {
    s: 12,
    m: 14,
    l: 16,
  },
};

const stylesText = StyleSheet.create({
  base: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  s: {
    fontSize: BUTTON.fontSize.s,
  },
  m: {
    fontSize: BUTTON.fontSize.m,
  },
  l: {
    fontSize: BUTTON.fontSize.l,
  },
  primary: {
    color: colors.base.white,
  },

  neutral: {
    color: colors.base.darkGray,
  },
});

const stylesBtn = StyleSheet.create({
  base: {
    elevation: 1,
    borderRadius: spacing[24],
    paddingVertical: spacing[12],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.base.lightGray,
    elevation: 0,
  },
  s: {
    paddingHorizontal: spacing[24],
  },
  m: {
    paddingHorizontal: spacing[32],
  },
  l: {
    paddingHorizontal: spacing[40],
  },
  primary: {
    backgroundColor: colors.brand.primary,
  },
  neutral: {
    backgroundColor: colors.base.white,
  },
  iconLeft: {
    marginRight: spacing[8],
  },
  iconRight: {
    marginLeft: spacing[8],
  },
});
