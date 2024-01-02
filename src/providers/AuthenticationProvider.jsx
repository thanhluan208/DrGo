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
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSave } from "../stores/useStores";

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
  const { t } = useTranslation();
  const token = httpService.getTokenFromLocalStorage(cachedKey.token);
  const [islogged, setIsLogged] = useState(!!token);
  const save = useSave();

  //! Function
  const handleLogin = useCallback(async (payload, { setSubmitting }) => {
    setSubmitting(true);
    const toastId = toast.loading(t("authentication.loggingIn"), {
      autoClose: false,
    });
    try {
      const { email, password } = payload;
      const response = await FirebaseServices.login(email, password);
      console.log("response", response._tokenResponse);
      const user = response?.user;
      const tokenResponse = response?._tokenResponse;

      const { idToken, refreshToken } = tokenResponse;
      if (idToken && refreshToken) {
        httpService.saveTokenToLocalStorage(idToken);
        httpService.attachTokenToHeader(idToken);
        httpService.saveItemToLocalStorage(
          cachedKey.AUTHENTICATION.REFRESH_KEY,
          refreshToken
        );
      }

      const userInfo = {
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
        avatar: user?.photoURL,
      };

      save(cachedKey.AUTHENTICATION.USER_INFOS, userInfo);
      setIsLogged(true);

      toast.update(toastId, {
        render: t("authentication.loginSuccess"),
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
        isLoading: false,
      });
      setSubmitting(false);
    } catch (error) {
      toast.update(toastId, {
        render: `${t("authentication.loginError")} \n ${error?.message}}`,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
        isLoading: false,
      });
      setSubmitting(false);
    }
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLoginFacebook = useCallback(async () => {
    try {
      const response = await FirebaseServices.logInWithFacebook();
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
