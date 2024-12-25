import { IDashCard } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/shared/utils";

const DashCard = (dcard: IDashCard) => {
  const { title, link, value, description } = dcard;

  const formatting = (value: number) => {
    if (value > 1000000) {
      return `${value / 1000000}M+`;
    } else if (value > 100000) {
      return `${value / 1000}K+`;
    } else if (value > 10000) {
      return `${value / 1000}K+`;
    } else if (value > 1000) {
      return `${value / 1000}K+`;
    } else return value;
  };

  return (
    <Link href={link}>
      <Card className="w-full bg-gray-50">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-muted-foreground">
            <div className="text-lg">{title ? title : "Title"}</div>
            <span>
              <dcard.icon className="size-6" />
            </span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="font-semibold text-3xl text-gray-600">
          {title.toLowerCase() === "total revenue"
            ? formatCurrency({
                amount: value,
                currency: "USD",
              })
            : formatting(value)}
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashCard;
