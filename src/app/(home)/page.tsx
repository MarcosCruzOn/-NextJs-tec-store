import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";

import ProductList from "./components/product-list";
import SectionTitle from "@/components/section-title";
import PromoBanner from "@/components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });
  const phones = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "headphones",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="/banner.png"
        alt="Até 55% de desconto esse mês"
        aria-describedby="banner que contem descontos"
      />

      <div className="">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/bannner Mouses.png"
        alt="Até 55% de desconto esse mês"
        aria-describedby="banner que contem descontos"
      />

      <div className="">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/banner Fones.png"
        alt="Até 20% de desconto esse mês"
        aria-describedby="banner que contem descontos"
      />

      <div className="">
        <SectionTitle>Fones</SectionTitle>
        <ProductList products={phones} />
      </div>
    </div>
  );
}
