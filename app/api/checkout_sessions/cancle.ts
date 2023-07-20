import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe("sk_test_51Mu7j9SDG7CXAX0BLT95BhnQXAPd9fh6xtPJEb0RyM1N60oVQXMkgxhCp94BTtNLuaA8L8zYtnQ607OcFjg5s8ro00AcJtDPXP",{apiVersion: '2022-11-15'})


export default async function handler( req: NextApiRequest,res: NextApiResponse) {
console.log("req",req,)
console.log("req---------------->",req.body[0].payment_intent_id)
const payment_intent =req.body[0].payment_intent_id

  try {
    const paymentIntent = await stripe.paymentIntents.cancel(
      payment_intent
    );



    res.status(200).json(paymentIntent)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}

