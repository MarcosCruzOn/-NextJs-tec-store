import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithTotalPrice } from "@/helpers/product";

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <div className="h-screen overflow-y-auto rounded-md border">
      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead className="sticky top-0 z-10">Nome</TableHead>
            <TableHead className="sticky top-0 z-10">Categoria</TableHead>
            <TableHead className="sticky top-0 z-10">Preço total</TableHead>
            <TableHead className="sticky top-0 z-10">Preço base</TableHead>
            <TableHead className="sticky top-0 z-10">Vendidos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>

              <TableCell>{(product as any).category.name}</TableCell>

              <TableCell>R$ {product.totalPrice.toFixed(2)}</TableCell>

              <TableCell>R$ {product.basePrice.toFixed(2)}</TableCell>

              <TableCell>0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
