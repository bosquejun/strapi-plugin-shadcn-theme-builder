import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Card, CardContent, CardHeader } from '../../ui/card';

const Card3 = () => {
  return (
    <Card className="relative w-full gap-0 pt-0 pb-4 h-full">
      <Quote className="absolute top-3 right-2 h-16 w-16 text-foreground/10 stroke-[1.5px]" />
      <CardHeader className="py-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-[15px] leading-none font-semibold">shadcn</span>
            <span className="text-sm leading-none text-muted-foreground">@shadcn</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[15px] text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper, augue at
          commodo interdum, erat dolor egestas eros, eu finibus turpis nunc at purus. Sed elementum
          rutrum nibh.
        </p>
      </CardContent>
    </Card>
  );
};

export default Card3;
