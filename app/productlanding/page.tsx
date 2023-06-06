'use client';
import { BsCurrencyRupee } from "react-icons/bs";

import { Product } from "@/types";
import { getActiveProductsById } from "@/utils/supabase-client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
interface Props {
    products: Product[];
}

export default function ProductLanding(router: any) {
    const { id } = router.searchParams
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const products = await getActiveProductsById(id)
            console.log("id based---------", products)
            const data = products ? products : []
            setProducts(data);
        }
        getProducts()
    }, [id])
    console.log("its an id", id);

    return (
        <div>
            {products?.map((prd: any) => {
                return (
                    <div className="product-landing-container" key={prd.id}>
                        <h1>{prd.name}</h1>
                        <img src={prd.image} style={{ height: "300px", width: "500px" }} />
                        <div className="product-details-container" style={{backgroundColor:"#0d2e6a",color:"white",padding:"10px",borderRadius:"10px",margin:"10px"}}>
                            <div className="product-details">
                            <h2 style={{fontWeight:"bold"}}>{prd.name}</h2>
                            <div style={{ display: "flex", justifyContent: "flex-end",fontWeight:"bold" }}>
                                <p style={{display:"flex"}}><BsCurrencyRupee />{prd.price} /-</p>
                            </div>
                        </div>
                        <p style={{color:"#CCEBEB"}}>{prd.prd_desc}</p>
                    </div>
                    <div className="buttons-container">
                        <button type="button" style={{backgroundColor:"#041933",margin:"10px",padding:"10px",borderRadius:"10px",color:"white",width:"100px"}}>ADD</button>
                        <button type="button" style={{backgroundColor:"yellow",margin:"10px",padding:"10px",borderRadius:"10px",color:"black",width:"100px"}}>SUBSCRIBE</button>
                    </div>
                    <div style={{margin:"10px",padding:"10px"}}>
                        <h1 style={{color:"black",margin:"5px"}}>DIRECT FROM OUR FARM TO YOUR HOME</h1>
                        <p>{prd.product_benefit}</p>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}