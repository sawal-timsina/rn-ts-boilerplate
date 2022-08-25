
import { QueryFunction } from "react-query";
import { API } from "~/src/lib/api";
import { DBUser } from "~/src/interfaces";
import auth from "@react-native-firebase/auth";
import { queryClient } from "~/src/lib/queryClient";

const getLoggedInUser: QueryFunction<DBUser> = async () => {
  const { data } = await API.get("/users/auth");
  return data;
};

export const getAuthUser = async () => {
  return queryClient.getQueryData<DBUser>("auth");
};

const logout = async () => {
  await auth().signOut();
  queryClient.setQueryData("auth", null);
  queryClient.removeQueries("auth");
  queryClient.clear();
};

export const userService = {
  getLoggedInUser,
  getAuthUser,
  logout,
};
