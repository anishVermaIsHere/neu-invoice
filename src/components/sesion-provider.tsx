"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";
import { User } from "@/store/auth.store";

const SessionProvider = ({ sessionUser }: { sessionUser: User }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (sessionUser) {
      setUser({
        id: sessionUser?.id,
        firstName: sessionUser?.firstName,
        lastName: sessionUser?.lastName,
        email: sessionUser?.email,
        address: sessionUser?.address,
        image: sessionUser?.image,
      });
    }
  }, [sessionUser]);

  return null;
};

export default SessionProvider;
