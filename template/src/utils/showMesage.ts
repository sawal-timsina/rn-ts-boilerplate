import { MessageOptions, showMessage } from "react-native-flash-message";
import { i18n } from "../lib/i18n";

export const Message = (
  payload: MessageOptions = { message: "Error Occurred", type: "default" }
) => {
  showMessage({
    ...payload,
    message: i18n.t(payload.message),
    titleStyle: [{ textAlign: "center", lineHeight: 30 }],
    type: payload.type,
  });
};

export const formatMessage = (message: string) => {
  let _message: any = message.split("[ ");
  _message = _message && (_message[1] ?? _message[0].split("] "));
  _message = String(_message).replace(new RegExp("[\\[-\\]]", "gm"), "");
  return _message;
};
