'use client';

import { Product } from "@/types";
import { getActiveProductsById } from "@/utils/supabase-client";
import { useRouter } from 'next/navigation';
interface Props {
    products: Product[];
  }

export default function ProductLanding({ products }: Props){
    const router = useRouter();
    return(
        <div className="productlanding-container">
            {products?.map((prd:any)=>{
                return(
                    <div key={prd.id}>
                        <h1>{prd.name}</h1>
                        <img src={prd.image} />
                    </div>
                )
            })}
        </div>
    )
} 

export async function getServerSideProps(context: any) {

    const { query: { id } } = context
    console.log("id---------->",id)
    // getdata with id and send to props 
    const products = await getActiveProductsById(id)
    console.log("id based---------", products)
    const product = products ? products : []
    return {
      props: { product }, // will be passed to the page component as props
    }
  }