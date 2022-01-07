import React, { useCallback } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { THEME } from "../../../theme";

interface Props {
  label?: string;
  selected: boolean;
  onPress: (selected: boolean) => void;
  disabled?: boolean;
  styles?: StyleProp<ViewStyle>;
}

export const RadioButton: React.FC<Props> = ({
  onPress,
  selected,
  label,
  disabled,
  styles,
}) => {
  const handlePress = useCallback(() => {
    onPress(!selected);
  }, [onPress, selected]);

  return (
    <View style={[styles]}>
      <TouchableOpacity
        activeOpacity={1}
        style={css.container}
        disabled={disabled}
        onPress={handlePress}
      >
        <View style={[css.radio, disabled && css.disabled]}>
          {selected && (
            <View style={[css.radio_checked, disabled && css.radio_disabled]}>
              <View style={[css.whiteCircle]} />
            </View>
          )}
        </View>
        {label && (
          <Text style={[css.label, disabled && css.label_disabled]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: THEME.colors.gray,
    backgroundColor: THEME.colors.grayLight,
  },
  disabled: {
    borderColor: THEME.colors.gray,
  },
  radio_checked: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: THEME.colors.primary,
    padding: 6,
  },
  whiteCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: THEME.colors.white,
  },
  radio_disabled: {
    backgroundColor: THEME.colors.gray,
  },
  label: {
    marginLeft: 8,
    ...THEME.typography.captionRegular,
  },
  label_disabled: {
    color: THEME.colors.gray,
  },
});
