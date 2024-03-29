import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ErrorToast } from '../components/Toast';

import { api } from '../services/api';

type User = {
  name: string;
  email: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Login(credentials: SignInCredentials): Promise<void>;
  Logout(): void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("@LOG:token");
    
    if (token) {
      api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const { name, email } = response.data;

        setUser({
          name,
          email
        });
      }).catch(() => {
        Logout();
      });
    }

  }, []);

  async function Login({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("session", {
        email,
        password
      });

      setUser(response.data.user);
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      localStorage.setItem("@LOG:user", JSON.stringify(response.data.user));
      localStorage.setItem("@LOG:token", response.data.token);
      localStorage.setItem("@LOG:refreshToken", response.data.refreshToken);
    } catch {
      ErrorToast("Credenciais incorretas!")
    }
  }

  function Logout() {
    setUser(null);

    localStorage.removeItem('@LOG:user');
    localStorage.removeItem('@LOG:token');
    localStorage.removeItem('@LOG:refreshToken');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
