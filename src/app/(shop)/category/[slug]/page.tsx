import { CATEGORY_ICON } from "@/app/constants/category-icon";
import { computerProductTotalPrice } from "@/helpers/product";
import ProductItem from "@/components/product-item";
import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: (await params).slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="mx-auto flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
      <Badge variant={"heading"}>
        {CATEGORY_ICON[(await params).slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computerProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
}
