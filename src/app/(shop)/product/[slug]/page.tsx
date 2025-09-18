import { prismaClient } from "@/lib/prisma";

import { computerProductTotalPrice } from "@/helpers/product";

import SectionTitle from "@/components/section-title";
import ProductImages from "../components/product-images";
import ProductInfo from "../components/product-info";
import ProductList from "@/components/product-list";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = await prismaClient.product.findFirst({
    where: {
      slug: (await params).slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9 lg:px-5">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
        <ProductInfo
          product={{
            ...product,
            totalPrice: computerProductTotalPrice(product),
          }}
        />
      </div>

      <div className="flex flex-col gap-5">
        <SectionTitle className="pl-5">Produtos Recomendados</SectionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  );
}
