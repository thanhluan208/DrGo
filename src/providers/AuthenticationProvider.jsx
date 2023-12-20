import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import httpService from "../services/httpServices";
import AuthenticationServices from "../services/authenticationServices";
import useToast, { useToastPromise } from "../hooks/useToast";
import cachedKey from "../constants/cachedKeys";
import FirebaseServices from "../services/firebaseServices";

const AuthenticationContext = createContext({
  islogged: false,
  setIsLogged: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  handleLoginGoogle: () => {},
  handleLoginFacebook: () => {},
  handleLoginTest: () => {},
});

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

const AuthenticationProvider = ({ children }) => {
  //! State
  const token = httpService.getTokenFromLocalStorage(cachedKey.token);
  const [islogged, setIsLogged] = useState(!!token);

  //! Function
  const handleLogin = useCallback(async (payload, setSubmitting) => {
    const onSuccess = (response, toast) => {
      if (response?.data?.token) {
        setIsLogged(true);
        httpService.saveTokenToLocalStorage(response.data.token);
        httpService.attachTokenToHeader(response.data.token);
        toast();
      } else {
        useToast("Login failed", "error");
      }
    };

    const onFail = (err, toast) => {
      setSubmitting(false);
      toast();
    };

    useToastPromise(
      () => AuthenticationServices.login(payload),
      {
        pending: "Logging in...",
        success: "Logged in successfully",
        error: "Failed to login",
      },
      onSuccess,
      onFail
    );
  }, []);

  const handleLoginTest = useCallback(async (payload, setSubmitting) => {
    setSubmitting(true);
    await useToastPromise(
      () => new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        pending: "Logging in...",
        success: "Logged in successfully",
        error: "Failed to login",
      }
    );
    setIsLogged(true);
    setSubmitting(false);
    httpService.saveTokenToLocalStorage("token");
  });

  const handleLoginGoogle = useCallback(async (token) => {
    try {
      const response = await AuthenticationServices.loginGoolge();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLoginFacebook = useCallback(async () => {
    try {
      const response = await FirebaseServices.logInWithFacebook();
      console.log("response", response);
    } catch (error) {
      console.log("err", error);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLogged(false);
    httpService.removeTokenFromLocalStorage(cachedKey.token);
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      islogged,
      setIsLogged,
      handleLogin,
      handleLogout,
      handleLoginGoogle,
      handleLoginFacebook,
      handleLoginTest,
    };
  }, [
    islogged,
    setIsLogged,
    handleLogin,
    handleLogout,
    handleLoginGoogle,
    handleLoginFacebook,
    handleLoginTest,
  ]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
