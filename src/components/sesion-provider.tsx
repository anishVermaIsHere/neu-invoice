'use client';

import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";

const SessionProvider = ({ session }: { session: any }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (session) {
      setUser({ 
        id: session?.user?.id,
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        email: session?.user?.email,
        address: session?.user?.address,
        image: session?.user?.image
    })
    }
  }, [session]);

  return null; 
};

export default SessionProvider;
