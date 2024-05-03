import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashBoardCardProps } from "./type";

function DashBoardCard({ title, subtitle, description }: DashBoardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashBoardCard
        title={"Sales"}
        subtitle={"Sales Desc"}
        description={"This is the description"}
      />
      <DashBoardCard
        title={"Sales"}
        subtitle={"Sales Desc"}
        description={"This is the description"}
      />
      <DashBoardCard
        title={"Sales"}
        subtitle={"Sales Desc"}
        description={"This is the description"}
      />
    </div>
  );
}
