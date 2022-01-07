import React, { useCallback, useState, memo } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
} from "react-native";
import { THEME } from "../../../theme";
import EyeOffIcon from "~/assets/icons/eye-off.svg";
import EyeOnIcon from "~/assets/icons/eye-on.svg";
import { useTranslation } from "react-i18next";

interface TextInputProps {
  wrapperStyles?: StyleProp<TextStyle>;
  label?: string;
  extralabel?: string;
  required?: boolean;
  error?: any;
  showCount?: boolean;
}

export const TextInput: React.FC<TextInputProps & RNTextInputProps> = memo(
  ({
    wrapperStyles,
    label,
    extralabel,
    required,
    error,
    showCount,
    value,
    autoComplete = "off",
    ...props
  }) => {
    const { t } = useTranslation();

    const [eyeToggle, setEyeToggle] = useState(props.secureTextEntry);

    const Counter = useCallback(() => {
      return (
        <Text style={[THEME.typography.subHeading, styles.counterText]}>
          {`${
            value ? Number(value.length).toLocaleString() : 0
          }/${props.maxLength?.toLocaleString()} ${t("Characters remaining")}`}
        </Text>
      );
    }, [value, props.maxLength, t]);

    return (
      <View style={props.style}>
        <Text style={[styles.labelText]}>
          {label}
          {required && <Text style={styles.requiredColor}> *</Text>}
          {extralabel && <Text style={[styles.extralabel]}>{extralabel}</Text>}
        </Text>
        <View
          style={[styles.wrapper, wrapperStyles, error && styles.errorBorder]}
        >
          <RNTextInput
            style={styles.inputStyle}
            value={value}
            maxLength={props.maxLength}
            autoComplete={autoComplete}
            {...props}
            secureTextEntry={eyeToggle}
          />
          {props.secureTextEntry && (
            <View style={styles.secureTextStyle}>
              {eyeToggle ? (
                <EyeOffIcon
                  onPress={() => setEyeToggle(!eyeToggle)}
                  fill={THEME.colors.grayDark}
                />
              ) : (
                <EyeOnIcon
                  onPress={() => setEyeToggle(!eyeToggle)}
                  fill={THEME.colors.grayDark}
                />
              )}
            </View>
          )}
        </View>
        <View style={styles.errorAndCount}>
          <Text style={[styles.errorMessage, styles.errorColor]}>{error}</Text>
          {showCount && <Counter />}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.colors.grayDark,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: THEME.colors.white,
    textAlignVertical: "center",
    ...THEME.typography.captionRegular,
  },
  inputStyle: {
    flex: 1,
    color: THEME.colors.black,
    height: 54,
    paddingHorizontal: 20,
  },
  labelText: {
    alignSelf: "flex-start",
    ...THEME.typography.captionBold,
  },
  errorColor: {
    color: THEME.colors.red,
  },
  errorBorder: {
    borderColor: THEME.colors.primary,
  },
  errorMessage: {
    marginTop: 8,
    marginBottom: 6,
    alignSelf: "flex-start",
    ...THEME.typography.subHeading,
  },
  extralabel: {
    ...THEME.typography.text,
    fontSize: 13,
    color: THEME.colors.grayDark,
  },
  requiredColor: {
    color: THEME.colors.primary,
  },
  errorAndCount: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counterText: { color: THEME.colors.grayDark, marginTop: 13 },
  secureTextStyle: {
    marginRight: 16,
  },
});
