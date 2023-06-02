import { Product } from "@/types";
import { getActiveProductsById } from "@/utils/supabase-client";
import { useRouter } from 'next/router';
interface Props {
    products: Product[];
  }

export const ProductLanding=({ products }: Props)=>{
    const sampleproducts=[
        {
          id: '1',
          active: true,
          name: 'Milk',
          description: 'Gently drawn from our highly pampered cows & delivered to you fresh from the farm.',
          image: 'https://www.prideofcows.com/wp-content/uploads/2020/10/milk.jpg',
          metadata: null,
          url: 'https://www.amazon.in/ref=nav_logo',
          price: '111',
          Delivered_by: 'Get Delivered Tomorrow'
        }];
    const router = useRouter();
    return(
        <div className="productlanding-container">
            {sampleproducts?.map((prd:any)=>{
                return(
                    <div key={prd.id}>
                        <h1>{prd.name}</h1>
                    </div>
                )
            })}
        </div>
    )
} 

export async function getServerSideProps(context: any) {
    console.log("hiiiiiiiiiiiii")

    const { query: { id } } = context
    console.log("id---------->",id)
    // getdata with id and send to props 
    const products = await getActiveProductsById(id)
    console.log("id based---------", products)
    const product = products ? products : []
    return {
      props: { product }, // will be passed to the page component as props
    }
  }