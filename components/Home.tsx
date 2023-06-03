"use client";

import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from 'next/navigation'

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  const router = useRouter();
  const productlanding = async (product: any) => {
    await router.push(`/productlanding  ?id=${product}`)
  }
  return (
    <>
    <h1 style={{color:"#0d2e6a",textAlign:"center",fontSize:"24px",fontWeight:"600",margin:"10px",padding:"10px"}}>Welcome To Pride Of Cows Family</h1>
    <div className="home-layout" style={{margin:"5px"}}>
      {products?.map((prd: any) => {
        return (
          <div key={prd.id}>
            <div className="card shadow-xl shadow-md" key={prd.id} onClick={()=>{productlanding(prd.id)}}>
            <div className="card-name1">
            <h3 style={{margin:"10px"}}>{prd.name}</h3>
              </div>
              <figure><img className="img" src={prd.image} width= {150} height={15} alt="image" /></figure>
              <div className="card-name2">
                <h3 style={{margin:"10px"}}>{prd.Delivered_by}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
    )
}