import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe("sk_test_51Mu7j9SDG7CXAX0BLT95BhnQXAPd9fh6xtPJEb0RyM1N60oVQXMkgxhCp94BTtNLuaA8L8zYtnQ607OcFjg5s8ro00AcJtDPXP", {apiVersion: '2022-11-15'})


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.id as string
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.')
    }
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ['payment_intent'],
      })

    res.status(200).json(checkout_session)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
