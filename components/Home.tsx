import { Product } from "@/types";
import Image from "next/image";

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  console.log("products=====>",products)
  return (
    <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
      {products?.map((prd: any) => {
        return (
          <div key={prd.id}>
            <div className="card w-90 bg-base-100 shadow-xl shadow-md" key={prd.id}>
              <figure><img className="img" src={prd.image} width= {150} height={15} alt="image" /></figure>
              <div className="card-body" style={{ margin: "10px" }}>
                <h2 className="card-title">{prd.name}</h2>
                <p style={{ color: "#7a716a" }}>{prd.description}</p>
              </div>
              <div className="card-actions justify-end">
                <a>
                <button className="btn btn-primary">Buy Now</button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    )
};