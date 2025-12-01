import { addDays } from 'date-fns';

import { Calendar } from '../../ui/calendar';
import { Card, CardContent } from '../../ui/card';

const start = new Date(2025, 5, 5);

export function CardsCalendar() {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </CardContent>
    </Card>
  );
}
