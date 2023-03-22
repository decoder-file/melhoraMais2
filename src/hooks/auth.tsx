import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { api } from "../services/api";
import { database } from "../database";
import { User as ModelUser } from "../database/model/User";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  photo?: string;
  location?: string;
  access_token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${access_token}`;

      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        await userCollection
          .create((newUser) => {
            (newUser.user_id = user.id),
              (newUser.name = user.name),
              (newUser.email = user.email),
              (newUser.access_token = access_token);
          })
          .then((userData) => {
            setData(userData._raw as unknown as User);
          })
          .catch(() => {
            // setIsLoading(false);
            return showMessage({
              message: "Erro na autenticação",
              description: "Não foi possível realizar o login!",
              type: "danger",
            });
          });
      });

      setData({ ...user, access_token });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>("users");
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.access_token}`;
        setData(userData);
      }
    }

    loadUserData();
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
