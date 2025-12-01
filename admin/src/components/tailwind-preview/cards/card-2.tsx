import { CircleHelpIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

export default function Card2() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">Pro Plan</CardTitle>
        <CardDescription>
          For teams that need advanced scheduling tools to streamline workflows and enhance
          collaboration, ensuring every meeting is productive and on track.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex items-end leading-6">
        <span className="text-4xl leading-none font-bold text-foreground">$20</span>
        <span className="ml-0.5 mr-1.5">/mo</span>
        <Tooltip>
          <TooltipTrigger className="mb-1">
            <CircleHelpIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>
              Seats are required for users to connect calendars and create Calendly links to help
              book meetings - meeting invitees do not require an account or seat.
            </p>
          </TooltipContent>
        </Tooltip>
      </CardContent>
      <CardFooter className="mt-2 flex justify-between">
        <Button size="lg" className="w-full">
          Try for free
        </Button>
      </CardFooter>
    </Card>
  );
}
