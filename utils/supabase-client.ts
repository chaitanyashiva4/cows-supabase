
import {Cart, ProductWithPrice } from '@/types';
import { Database } from '@/types_db'; import {
  createBrowserSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { data } from 'autoprefixer';
import { v4 as uuidv4 } from 'uuid';

const myUUID: string = uuidv4();
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


export const deleteCartItem = async (id:any)=>{
  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('id', id)
  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export const getActiveProductsCount= async (id:any): Promise<
  Cart[]
> => {
  const { data, error } = await supabase
    .from('cart')
    .select('*,id,customer_id,count,product_id')
    .eq('id',id)

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

export const insertProductsByUserId = async (customer_id: any, product_id: any): Promise<
  ProductWithPrice[]
> => {
  console.log({ 'customer_id': customer_id, 'product_id': product_id })
  const { data, error } = await supabase
    .from('cart')
    .insert([{ 'customer_id': customer_id, 'product_id': product_id }])
    .select('id')
  if (error) {
    console.log(error.message);
  }
  // TODO: improve the typing here.
  console.log({ 'customer_id': customer_id, 'product_id': product_id })
  return (data as any) || [];
};

export const updateCartProductId = async (id: any, count: any) => {
  const { data, error } = await supabase
    .from('cart')
    .update({ count: count })
    .eq('id', id)
  if (error) {
    console.log(error.message);
  }
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

export const getCartDataByUser = async (userID: any): Promise<
  Cart[]
> => {
  console.log("userId========",userID);
  const { data, error } = await supabase
    .from('cart')
    .select(`id, customer_id, product_id, count, 
      products(*)`)
    .eq('customer_id', userID)

  if (error) {
    console.log(error.message);
  }
  console.log("............,", data)
  // TODO: improve the typing here.
  return (data as any) || [];
};