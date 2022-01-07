import auth from "@react-native-firebase/auth";
import { queryClient } from "../lib/queryClient";
import AsyncStorage from "@react-native-community/async-storage";

export const login = async (email: string, password: string) => {
  if (auth().currentUser) {
    await auth().signOut();
  }
  return auth().signInWithEmailAndPassword(email, password);
};

export const register = async (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const reset = async (email: string) => {
  return auth().sendPasswordResetEmail(email);
};

export const verifyUser = async (password: string) => {
  const email = auth().currentUser?.email;
  return auth().signInWithEmailAndPassword(email || "", password);
};

export const logout = async () => {
  await auth().signOut();
  queryClient.setQueryData("auth", null);
  queryClient.removeQueries("auth");
  queryClient.clear();
  AsyncStorage.clear();
};
