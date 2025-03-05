import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type DayPnL = {
  date: Date;
  pnl: number;
};

interface CalendarProps {
  trades: DayPnL[];
  className?: string;
}

export function TradingCalendar({ trades, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const getPnLForDate = (date: Date) => {
    const trade = trades.find((t) => isEqual(t.date, date));
    return trade?.pnl || 0;
  };

  const getWeeklyPnL = (startDate: Date) => {
    const weekDays = eachDayOfInterval({
      start: startDate,
      end: add(startDate, { days: 6 }),
    });
    return weekDays.reduce((total, day) => total + getPnLForDate(day), 0);
  };

  const getPnLColor = (pnl: number) => {
    if (pnl === 0) return "bg-gray-100 dark:bg-gray-800";
    return pnl > 0
      ? "bg-green-100 dark:bg-green-900"
      : "bg-red-100 dark:bg-red-900";
  };

  const previousMonth = () => {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  return (
    <div className={cn("pt-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-8 gap-1 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Week"].map(
          (day) => (
            <div
              key={day}
              className="flex h-8 items-center justify-center font-medium"
            >
              {day}
            </div>
          )
        )}
        {days.map((day, dayIdx) => {
          const pnl = getPnLForDate(day);
          if (dayIdx % 7 === 0) {
            const weeklyPnL = getWeeklyPnL(day);
            return (
              <>
                <div
                  key={day.toString()}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 relative",
                    !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-muted-foreground",
                    getPnLColor(pnl)
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={cn(
                      "mb-1",
                      isToday(day) && "rounded-full bg-primary text-primary-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  {pnl !== 0 && (
                    <span className="text-xs font-medium">
                      ${pnl.toLocaleString()}
                    </span>
                  )}
                </div>
                {(dayIdx + 1) % 7 === 0 && (
                  <div
                    key={`week-${dayIdx}`}
                    className={cn(
                      "flex flex-col items-center justify-center p-2",
                      getPnLColor(weeklyPnL)
                    )}
                  >
                    <span className="text-xs font-medium">
                      ${weeklyPnL.toLocaleString()}
                    </span>
                  </div>
                )}
              </>
            );
          }
          return (
            <div
              key={day.toString()}
              className={cn(
                "flex flex-col items-center justify-center p-2 relative",
                !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-muted-foreground",
                getPnLColor(pnl)
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "mb-1",
                  isToday(day) && "rounded-full bg-primary text-primary-foreground"
                )}
              >
                {format(day, "d")}
              </time>
              {pnl !== 0 && (
                <span className="text-xs font-medium">
                  ${pnl.toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 