"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,

} from "react";
import { supabase } from "@/app/lib/supabase";
import { User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  full_name: string;
};

type UserContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

//   const refreshProfile = async () => {
const refreshProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
}, []); 
useEffect(() => {
  const loadUser = async () => {
    await refreshProfile();
  };

  loadUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async () => {
    await refreshProfile();
  });

  return () => {
    subscription.unsubscribe();
  };
}, [refreshProfile]);
// useEffect(() => {
//   refreshProfile();

//   const {
//     data: { subscription },
//   } = supabase.auth.onAuthStateChange(() => {
//     refreshProfile();
//   });

//   return () => subscription.unsubscribe();
// }, [refreshProfile]);

//   useEffect(() => {
//     refreshProfile();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(() => {
//       refreshProfile();
//     });

//     return () => subscription.unsubscribe();
//   }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}