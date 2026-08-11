"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export function useUser() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  return {
    profile,
    loading,
  };
}