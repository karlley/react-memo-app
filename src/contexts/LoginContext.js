import { useState, useEffect, createContext } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  login: () => {},
});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    return storedIsLoggedIn || false;
  });
  const login = () => {
    setIsLoggedIn((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </LoginContext.Provider>
  );
};
