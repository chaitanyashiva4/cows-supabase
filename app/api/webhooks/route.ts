import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Readable } from 'node:stream';

import { stripe } from '@/utils/stripe';
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange
} from '@/utils/supabase-admin';
export const runtime = 'edge'
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const payload = await req.body;
  const { data, type } = payload
  console.log("type---------->",data,type)

  try {
    switch (type) {
      case 'product.created':
      case 'product.updated':
        await upsertProductRecord(data.object as Stripe.Product);
        break;
      case 'price.created':
      case 'price.updated':
        await upsertPriceRecord(data.object as Stripe.Price);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = data.object as Stripe.Subscription;
        await manageSubscriptionStatusChange(
          subscription.id,
          subscription.customer as string,
          type === 'customer.subscription.created'
        );
        break;
      case 'checkout.session.completed':
        const checkoutSession = data
          .object as Stripe.Checkout.Session;
        if (checkoutSession.mode === 'subscription') {
          const subscriptionId = checkoutSession.subscription;
          await manageSubscriptionStatusChange(
            subscriptionId as string,
            checkoutSession.customer as string,
            true
          );
        }
        break;
      default:
        throw new Error('Unhandled relevant event!');
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send('Webhook error: "Webhook handler failed. View logs."');
  }
  res.json({ received: true });
};

