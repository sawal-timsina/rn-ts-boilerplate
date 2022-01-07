import React, { memo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { THEME } from "../../../theme";

export interface ButtonProps {
  onPress: () => void;
  type?: "filled" | "outlined";
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: JSX.Element;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingIndicatorColor?: string;
  enableTouch?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  size?: "small" | "medium" | "big";
}

export const Button: React.FC<ButtonProps> = memo(
  ({
    style,
    title,
    onPress,
    children,
    isLoading,
    loadingIndicatorColor = THEME.colors.black,
    isDisabled,
    enableTouch = true,
    disabledStyle,
    type = "filled",
    size = "big",
    textStyle,
  }) => {
    return (
      <TouchableOpacity
        disabled={!enableTouch}
        onPress={isLoading ? undefined : onPress}
        style={[
          styles.btn,
          styles[type],
          styles[size],
          style,
          isDisabled && (disabledStyle ? disabledStyle : styles.disableStyle),
        ]}
      >
        {!children && isLoading ? (
          <ActivityIndicator color={loadingIndicatorColor} />
        ) : (
          <Text
            style={[styles[`${size}Text`], styles[`${type}Text`], textStyle]}
          >
            {title}
          </Text>
        )}
        {children && children}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "center",
  },
  filled: {
    backgroundColor: THEME.colors.primary,
  },
  outlined: {
    borderWidth: 1,
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.white,
  },
  filledText: {
    color: THEME.colors.white,
  },
  outlinedText: {
    color: THEME.colors.primary,
  },
  disableStyle: {
    backgroundColor: THEME.colors.grayDark,
  },
  small: {
    paddingHorizontal: 35,
    paddingVertical: 11,
  },
  medium: {
    padding: 13,
    paddingHorizontal: 4,
  },
  big: {
    padding: 15,
    paddingHorizontal: 4,
  },
  bigText: THEME.typography.buttonText,
  mediumText: THEME.typography.captionBold,
  smallText: THEME.typography.subHeadingBold,
});
