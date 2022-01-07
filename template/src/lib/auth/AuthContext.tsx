import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { userService } from "../../services";
import { queryClient } from "../queryClient";
import { DBUser } from "../../interfaces";

interface IAuthContext {
  loggedIn?: boolean;
  authLoading?: boolean;
  user?: FirebaseAuthTypes.User | null;
  setUser?: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
  initializing?: boolean;
  dbUser?: DBUser;
}

export const AuthContext = createContext<IAuthContext>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const { data: dbUser, isLoading } = useQuery(
    ["auth"],
    userService.getLoggedInUser,
    {
      enabled: loggedIn,
      staleTime: Number.POSITIVE_INFINITY,
    }
  );

  useEffect(() => {
    return auth().onAuthStateChanged(async (usr) => {
      if (usr) {
        queryClient.invalidateQueries("auth");
        setUser(usr);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
      setInitializing(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn && !!dbUser,
        user,
        setUser,
        initializing,
        dbUser,
        authLoading: isLoading || initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
