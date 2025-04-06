import { useState, useEffect, createContext, useContext } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  toggleLogin: () => {},
});

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    return storedIsLoggedIn || false;
  });
  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
