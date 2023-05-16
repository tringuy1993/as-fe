"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useFBAuth } from "../(auth)/FBAuthContext";

export default function Layout({ children }) {
  const { user } = useFBAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) {
      router.push("/signin");
    }
  }, [user]);

  return <>{children}</>;
}
