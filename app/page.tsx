
import Home from '@/components/Home';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
import { Suspense } from 'react';

export default async function PricingPage() {
  const product = await getActiveProductsWithPrices();
  console.log("Product:",product)
  return (
    <Suspense fallback={<p>Loading Products...</p>}>
      <Home products={product} />
    </Suspense>
  );
}