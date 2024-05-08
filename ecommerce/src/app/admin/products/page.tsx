import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductsTable } from "../_components/ProductTable";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-2xl font-medium text-primary">Products</h2>
        <Button asChild>
          <Link href={"/admin/products/new"}>Add Product</Link>
        </Button>
      </div>
      <section className="flex justify-center mt-10">
        <ProductsTable />
      </section>
    </>
  );
}
