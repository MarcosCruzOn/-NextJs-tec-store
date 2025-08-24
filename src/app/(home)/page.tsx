import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";

import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="">
      <Image
        src="/banner.png"
        height={0}
        width={0}
        sizes="100vw"
        alt="Até 55% de desconto esse mês"
        aria-describedby="banner que contem descontos"
        className="h-auto w-full"
      />

      <div className="my-8 px-5">
        <Categories />
      </div>
      <div>
        <ProductList products={deals} />
      </div>
    </div>
  );
}
