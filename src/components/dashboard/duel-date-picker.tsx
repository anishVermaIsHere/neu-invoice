"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getStartEndDates } from "@/shared/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export function DuelDatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const dates = getStartEndDates();

  const startDate = searchParams.get("startdate") as string || dates.startDate;
  const endDate = searchParams.get("enddate") as string || dates.endDate;

  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate,
    to: new Date(endDate),
  });

  useEffect(()=>{
  if (date?.from && date?.to) {
      router.push(`${path}?startdate=${format(date.from, "yyyy-MM-dd")}&enddate=${format(date.to, "yyyy-MM-dd")}`);
    }
    return () => {}
  },[date]);


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date?.to ? (
                <>
                  {format(date?.from, "LLL dd, y")} - {""}
                  {format(date?.to, "LLL dd, y")}
                </>
              ) : (
                format(date?.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
