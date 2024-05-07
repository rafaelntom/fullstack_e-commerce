import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import database from "../db/db";
import { DashBoardCardProps } from "./type";

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

async function getProductData() {
  const [activeProducts, inactiveProducts] = await Promise.all([
    database.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),

    database.product.count({
      where: {
        isAvailableForPurchase: false,
      },
    }),
  ]);

  return { activeProducts, inactiveProducts };
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
  const [userData, salesData, productData] = await Promise.all([
    getUserData(),
    getSalesData(),
    getProductData(),
  ]);

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
      <DashBoardCard
        title={"Products"}
        subtitle={formatNumber(productData.activeProducts) + " Active Products"}
        description={
          formatNumber(productData.inactiveProducts) + " Inactive Products"
        }
      />
    </div>
  );
}
