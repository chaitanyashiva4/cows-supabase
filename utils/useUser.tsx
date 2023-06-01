"use client";

import { Subscription, UserDetails } from '@/types';
import {
  User, useSessionContext, useUser as useSupaUser
} from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase-client';
import { getCurrentUser } from './getuser';


type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [users, setUsers] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const value = await getCurrentUser()
      setUsers(value)
    };
    getUsers();
   
  }, [users, isLoadingUser]);

  const value = {
    accessToken,
    user:users,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};


