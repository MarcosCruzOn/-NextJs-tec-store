import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./category-item";

const Categories = async () => {
  const categories = await prismaClient.category.findMany({});
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-x-1 gap-y-2 px-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
