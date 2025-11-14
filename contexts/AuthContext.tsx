import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
  token: string | null;
  favorites: string[];
  handleLogin: () => void;
  handleLogout: () => void;
  toggleFavorite: (id: string) => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthProviderProps = {
  children: ReactNode;
};

// Verifica se está no Client ou no Server
const isClient = (): boolean => {
  return typeof window !== "undefined";
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    if (isClient()) {
      return localStorage.getItem("jota-news-user-token");
    }
    return null;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (isClient()) {
      const storedFavorites = localStorage.getItem("jota-news-user-favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  const handleLogin = () => {
    const fakeToken = `fake-jwt-token-${Date.now()}`;
    setToken(fakeToken);
    localStorage.setItem("jota-news-user-token", fakeToken);
  };

  const handleLogout = () => {
    setToken(null);
    setFavorites([]);
    localStorage.removeItem("jota-news-user-token");
    localStorage.removeItem("jota-news-user-favorites");
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      let newFavorites: string[];

      if (prevFavorites.includes(id)) {
        newFavorites = prevFavorites.filter((favId) => favId !== id);
      } else {
        newFavorites = [...prevFavorites, id];
      }

      localStorage.setItem(
        "jota-news-user-favorites",
        JSON.stringify(newFavorites)
      );

      return newFavorites;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        favorites,
        handleLogin,
        handleLogout,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
