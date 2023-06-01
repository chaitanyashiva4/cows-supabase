import { supabase } from "./supabase-client";

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user;
  };

  export const LogoutCurrentUser = async () => {
    const { error } = await supabase.auth.signOut()

    return error;
  };