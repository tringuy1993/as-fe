'use client'
import { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import firebase_app from "./firebase_config";

const auth = getAuth(firebase_app);

export const FBAuthContext = createContext({});

export const useFBAuth = () => useContext(FBAuthContext);


export const FBAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(true);
  // const [refreshToken, setRefreshToken] = useState(null);

  // https://reacthustle.com/blog/nextjs-redirect-after-login
  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl) ?? "/";
  
  async function loginUser (e) {
    await signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => router.push(callbackUrl))
      .catch((error) => {
        setErrMsg(error.code);
      });
  };

  let logoutUser = () => {
    signOut(auth);
    router.push("/signin");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setPending(false);
    });

    return unsubscribe;
  });

  // Define a function to refresh the id_token
  const refreshIdToken = async () => {
    return await auth.currentUser.getIdToken(true);
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    errMsg: errMsg,
    refreshIdToken: refreshIdToken,
  };

  return (
    <FBAuthContext.Provider value={contextData}>
      {!pending && children}
    </FBAuthContext.Provider>
  );
};
