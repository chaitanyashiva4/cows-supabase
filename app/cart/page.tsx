"use client"
import { BsTrash, BsCurrencyRupee, BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

export default function Cart() {
    const [count, setCount] = useState(1);

    const Increment = () => {
        setCount(count + 1);
    }
    const Decrement = () => {
        if(count>1){
            setCount(count - 1);
        }
    }
    return (
        <>
            <h1 className="m-3 p-4">Cart page</h1>
            <div className="cart-container m-4 p-4">
                <div>
                    <img src="" alt='product-image' />
                </div>
                <div className="cart-content">
                    <div style={{ display: "flex" }} className="p-5">
                        <h2 className="mr-2">Ghee(1lit)</h2>
                        <div style={{ display: "flex" }} className="ml-5">
                            <h3>|</h3>
                            <BsCurrencyRupee className="mr-2 mt-1 ml-2" />
                            <p className="mr-2">{2200*count}</p>
                            <BsTrash className="mr-2 mt-1 ml-3" />
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                    <p className="m-2">{1*count} Qty</p>
                    <div style={{display:"flex",backgroundColor:"#171e25",height:"40px",alignItems:"center"}} className="m-2 p-4">
                        <button type='button' onClick={Decrement}><AiOutlineMinus /></button>
                        <p className="mr-2 ml-3">{count}</p>
                        <button type='button' onClick={Increment}><BsPlusLg /></button>
                    </div>
                    </div>
                    <div style={{display:"flex"}} className="m-2"><BsCurrencyRupee className="mr-2 mt-1 ml-2" />
                            <p className="mr-2">{2200*count}</p></div>
                </div>                
            </div>
            <h2 className="m-3">Total Amount Rs : {2200*count} /-</h2>
        </>
    )
}