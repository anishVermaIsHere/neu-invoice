import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/shared/utils";
import { getInvoices } from "@/lib/prisma/utils";
import { getAuth } from "@/auth";
import { CurrencyType } from "@/interfaces";


export async function RecentInvoices() {
  const session = await getAuth();
  const data = await getInvoices(session?.user?.id as string, 7);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex size-9 text-[hsl(var(--chart-1))]">
              <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 truncate">
              <p className="text-sm font-medium leadin-none">
                {item.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.clientEmail}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {formatCurrency({
                amount: item.total,
                currency: item.currency as CurrencyType,
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
