import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-2xl font-medium text-primary">Page header</h2>
        <Button asChild>
          <Link href={"/admin/products/new"}>Add Product</Link>
        </Button>
      </div>
    </>
  );
}
