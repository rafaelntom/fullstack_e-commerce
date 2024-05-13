import { ProductForm } from "@/app/admin/_components/ProductForm";
import database from "@/app/db/db";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await database.product.findUnique({ where: { id } });
  return (
    <>
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-2xl font-medium text-primary">Edit Product</h2>
      </div>
      <ProductForm product={product} />
    </>
  );
}
