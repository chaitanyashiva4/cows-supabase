import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
const stripe = new Stripe("sk_test_51NLfmkSFSar6cJiwap3jqvbG83J80509zJ9kti6k3rrleixLW2atgxDfBSKixoRM3zv8VSfsLipKCR0JOMY90bGJ008IQ6Px8D",{apiVersion: '2022-11-15'})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {


// const paymentIntent = await stripe.paymentIntents.cancel(
//   // 'pi_1DtBRx2eZvKYlo2Ck9oASkxL'
// );

    try {
      console.log("req.body==========================>",  req.body)
      const data=req.body
      const items:any=[]
      data.products.map((prod:any)=>{
        const itemobj={
          price_data: {
            currency: prod.currency,
            unit_amount: Number(`${prod.price}00`),
            product_data: {
              name: prod.name,
            },
          },
          quantity: prod.quantity,
        }
        items.push(itemobj)
      })

      const params: Stripe.Checkout.SessionCreateParams = {
        line_items: items,
        mode: "payment",
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/use-shopping-cart`
    }
      const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params)
    res.status(200).json(checkoutSession)
  } catch (err) {
    console.log(err)
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
} else {
  res.setHeader('Allow', 'POST')
  res.status(405).end('Method Not Allowed')
}
}