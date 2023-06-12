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

export const getActiveProductsById = async (id: any): Promise<
  ProductWithPrice[]
> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
  if (error) {
    console.log(error.message);
  }
  // TODO: improve the typing here.
  return (data as any) || [];
};
export const insertProductsByUserId = async (customer_id:any,product_id: any): Promise<
  ProductWithPrice[]
> => {
  console.log({'customer_id':customer_id,'product_id':product_id})
  const { data, error } = await supabase
  .from('cart')
  .insert([{'customer_id':customer_id,'product_id':product_id}])
  .select('id')
  if (error) {
    console.log(error.message);
  }
  // TODO: improve the typing here.
  console.log({'customer_id':customer_id,'product_id':product_id})
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
