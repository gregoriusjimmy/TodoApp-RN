import {colors, spacing} from '@utils/theme';
import {forwardRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import {CTEXT, CText} from '../CText/CText';

interface Props extends TextInputProps {
  label?: string;
  width?: string | number | undefined;
  textCenter?: boolean;
  styleInput?: StyleProp<TextStyle>;
  error?: string;
}

export const InputField = forwardRef<TextInput, Props>(
  (
    {width, textCenter, style, label, styleInput, error, ...otherProps},
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
      <View style={[!!width && {width}, style]}>
        {label && (
          <CText variant="captionBold" style={styles.label}>
            {label}
          </CText>
        )}
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          ref={ref}
          style={[
            styles.base,
            isFocus && styles.focus,
            textCenter && styles.textCenter,
            styleInput,
          ]}
          selectionColor={colors.brand.primary}
          {...otherProps}
        />
        {!!error && (
          <CText style={styles.errorText} variant="caption" color="error">
            {error}
          </CText>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  base: {
    minHeight: spacing[40],
    borderWidth: 1,
    paddingHorizontal: spacing[16],
    fontSize: CTEXT.fontSize.p,
    fontFamily: CTEXT.fontFamily.regular,
    color: colors.base.black,
    borderColor: colors.base.lightGray,
    borderRadius: spacing[8],
  },
  focus: {
    borderColor: colors.brand.primary,
  },
  textCenter: {
    textAlign: 'center',
  },
  errorText: {
    marginTop: spacing[8],
  },
  label: {
    marginBottom: spacing[4],
  },
});
