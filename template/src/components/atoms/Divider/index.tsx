import * as React from "react";
import { FC } from "react";
import { View } from "react-native";

interface Props {
  width?: number | string;
  height?: number | string;
  background?: string;
  marginTop?: number;
  marginBottom?: number;
}

export const Divider: FC<Props> = React.memo(
  ({ width, height, background, marginTop, marginBottom }) => {
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: background,
          marginTop,
          marginBottom,
        }}
      />
    );
  }
);
