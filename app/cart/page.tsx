"use client"
import { BsTrash, BsCurrencyRupee, BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { deleteCartItem, getActiveProductsWithPrices, getCartDataByUser, updateCartProductId } from "@/utils/supabase-client";
import { getCurrentUser } from "@/utils/getuser";
import { useRouter } from "next/navigation";
import { fetchPostJSON } from "@/utils/stripe";

export default async function Cart() {
    const [cart, setCart] = useState([])
    const [user, setUsers] = useState<any>();
    useEffect(() => {
        const getCartData = async () => {
            const value: any = await getCurrentUser()
            setUsers(value?.id)
            const cartData: any = await getCartDataByUser(value?.id)
            setCart(cartData);
        }
        getCartData();
    }, [])

    const Increment = async (id: any, count: any) => {
        await updateCartProductId(id, count + 1)
        const cartData: any = await getCartDataByUser(user)
        setCart(cartData);
    }
    const Decrement = async (id: any, count: any) => {
        if (count > 1) {
            await updateCartProductId(id, count - 1)
            const cartData: any = await getCartDataByUser(user)
            setCart(cartData);
        } else {
            alert("need to add delete item")
        }
    }
    const onDeleteItem = async (id: any) => {
        await deleteCartItem(id)
        const cartData: any = await getCartDataByUser(user)
        setCart(cartData);
    }
    console.log("cart=====", cart, user);
    const router = useRouter();
    const cartPage = async (cartobj: any) => {

        const response = await fetchPostJSON(
            '/api/checkout_sessions/cart',
            cartobj
        )
        if (response.statusCode > 399) {
            console.error(response.message)
            alert(response.message)
            return
        }
        router.replace(response.url)
    }
    const product = await getActiveProductsWithPrices();
    console.log("product", product);
    const cartobj = {
        "products": product,
        "total": 21,
        "itemCount": 1,
    }

    return (
        <div>
            <h1 className="m-3 p-3">All Your Orders are Here</h1>
            {cart?.map((prd: any) => {
                return (
                    <>
                        <div className="cart-container m-4 p-4" key={prd.products.id}>
                            <div className="cart-content-container">
                                <img src={prd.products.image} alt='product-image' className="cart-image" />
                                <div className="cart-content">
                                    <div style={{ display: "flex" }} className="p-5">
                                        <h2 className="mr-2">{prd.products.name}</h2>
                                        <div style={{ display: "flex" }} className="ml-5">
                                            <h3>|</h3>
                                            <BsCurrencyRupee className="mr-2 mt-1 ml-2" />
                                            <p className="mr-2">{prd.products.price * prd.count}</p>
                                            <button type="button"><BsTrash className="mr-2 mt-1 ml-3" onClick={() => onDeleteItem(prd.id)} /></button>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <p className="m-2">{prd.count} Qty</p>
                                        <div style={{ display: "flex", backgroundColor: "#171e25", height: "40px", alignItems: "center" }} className="m-2 p-4">
                                            <button type='button' onClick={() => Decrement(prd.id, prd.count)}><AiOutlineMinus /></button>
                                            <p className="mr-2 ml-3">{prd.count}</p>
                                            <button type='button' onClick={() => Increment(prd.id, prd.count)}><BsPlusLg /></button>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }} className="m-2"><BsCurrencyRupee className="mr-2 mt-1 ml-2" />
                                        <p className="mr-2">{prd.products.price * prd.count}</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className='icon-bs' style={{ backgroundColor: "#d8b46c", width: "100%", color: "white" }}
                                onClick={() => cartPage(cartobj)}>
                                MAKE A PAYMENT
                            </button>
                        </div>

                    </>
                )
            })}
        </div>
    )
}

function getCartData() {
    throw new Error("Function not implemented.");
}