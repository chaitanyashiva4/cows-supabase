'use client';
import { Product } from "@/types";
import { getCurrentUser } from "@/utils/getuser";
import { getActiveProductsById, getCartDataByUser, insertProductsByUserId, updateCartProductId } from "@/utils/supabase-client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
interface Props {
  products: Product[];
}

export default function ProductLanding(router: any) {
  const [products, setProducts] = useState([])
  const [user, setUsers] = useState<User | null>(null);
  useEffect(() => {
    const getProducts = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const productId = urlParams.get("id")
      const products: any = await getActiveProductsById(productId)
      setProducts(products);
    }
    getProducts()
    const getUsers = async () => {
      const value: any = await getCurrentUser()
      setUsers(value?.id)
    };
    getUsers();
  }, [])

  const addtoCart = async (product_id: any) => {
    const newdata = getCartDataByUser(user)
    const cartProductIds: any = await newdata ? await newdata : [];
    const isProduct = cartProductIds.find((d: any) => d.product_id === product_id)
    if (isProduct) {
      const count: any = cartProductIds[0].count
      await updateCartProductId(cartProductIds[0].id, count + 1)
    } else {
      await insertProductsByUserId(user, product_id)
    }
    alert('Added to cart');
  }

  return (
    <div>
      {products?.map((prd: any) => {
        return (
          <div className="product-landing-container" key={prd.id}>
            <h1>{prd.name}</h1>
            <img src={prd.image} style={{ height: "300px", width: "500px" }} />
            <div className="product-details-container p-3" style={{ backgroundColor: "#0d2e6a", color: "white", padding: "10px", borderRadius: "10px", margin: "10px" }}>
              <div className="product-details">
                <h2 style={{ fontWeight: "bold" }}>{prd.name}</h2>
                <div style={{ display: "flex", justifyContent: "flex-end", fontWeight: "bold" }}>
                  <p style={{ display: "flex" }}><BsCurrencyRupee />{prd.price} /-</p>
                </div>
              </div>
              <p style={{ color: "#CCEBEB" }} className="m-2 p-2">{prd.prd_desc}</p>
            </div>
            <div className="buttons-container">
              <button type="button" style={{ backgroundColor: "#041933", margin: "10px", padding: "10px", borderRadius: "10px", color: "white", width: "100px" }} onClick={() => { addtoCart(prd.id) }}>ADD</button>                    </div>
            <div style={{ margin: "10px", padding: "10px" }}>
              <h1 style={{ color: "black", margin: "5px" }}>DIRECT FROM OUR FARM TO YOUR HOME</h1>
              <p>{prd.product_benefit}</p>
            </div>
            <div className="nutrition-chart-container" style={{ margin: "10px", padding: "10px" }}>
              <h1 style={{ margin: "5px", padding: "5px" }}>NUTRITION CHART</h1>
              <img src={prd.nutrition_chart} style={{ margin: "10px", padding: "10px" }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}