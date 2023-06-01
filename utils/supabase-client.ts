import { ProductWithPrice } from '@/types';
import { Database } from '@/types_db';
import {
  createBrowserSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';


export const supabase = createBrowserSupabaseClient<Database>();

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPrice[]
> => {
  const { data, error } = await supabase
  .from('products')
  .select('*')

  if (error) {
    console.log(error.message);
  }
  // TODO: improve the typing here.
  return (data as any) || [];
};

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from('users')
    .update({
      full_name: name
    })
    .eq('id', user.id);
};
