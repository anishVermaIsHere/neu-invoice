import { IDashCard } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const DashCard = (dcard: IDashCard) => {
  const { title, link } = dcard;
  return (
    <Link href={link}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{ title ? title : "Title"}</CardTitle>
          <CardDescription>loremsdssd ssfs fss sfs</CardDescription>
        </CardHeader>
        <CardContent>dfd</CardContent>
      </Card>
    </Link>
  );
};

export default DashCard;
