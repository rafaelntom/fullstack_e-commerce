/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-red-800 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-red-950 w-[60%] rounded-md flex flex-col items-center justify-center text-white p-8 space-y-4 shadow-lg">
        <h1 className="text-3xl font-bold">Oops! Page Not Found</h1>
        <p className="text-lg text-center">
          We're sorry, but the page you are looking for could not be found.
        </p>
        <Button variant={"secondary"}>
          <Link href="/admin">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
