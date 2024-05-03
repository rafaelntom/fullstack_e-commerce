import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashBoardCardProps } from "./type";
import database from "../db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await database.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    ammount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    database.user.count(),
    database.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    avarageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

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

export default async function AdminDashboard() {
  const salesData = await getSalesData();
  const userData = await getUserData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashBoardCard
        title={"Sales"}
        subtitle={formatNumber(salesData.ammount) + " Orders"}
        description={formatCurrency(salesData.numberOfSales)}
      />
      <DashBoardCard
        title={"Customers"}
        subtitle={formatNumber(userData.userCount) + " Users"}
        description={formatCurrency(userData.avarageValuePerUser)}
      />
    </div>
  );
}
