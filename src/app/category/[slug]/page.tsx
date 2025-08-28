import { CATEGORY_ICON } from "@/app/constants/category-icon";
import { computerProductTotalPrice } from "@/app/helpers/product";
import DiscountBadge from "@/components/discount-badge";
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
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="border-primary w-fit gap-1 border-2 px-3 py-1.5 text-base uppercase"
        variant={"outline"}
      >
        {CATEGORY_ICON[(await params).slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>
      <div className="grid grid-cols-2 gap-8">
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
