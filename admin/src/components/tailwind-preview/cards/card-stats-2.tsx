import { Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { ChartConfig, ChartContainer } from '../../ui/chart';

const data = [
  {
    revenue: 10400,
    subscription: 40,
  },
  {
    revenue: 14405,
    subscription: 90,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 89,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 78,
  },
  {
    revenue: 26475,
    subscription: 89,
  },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--primary)',
  },
  subscription: {
    label: 'Subscriptions',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function CardStats2() {
  return (
    <Card className="relative flex flex-col overflow-hidden pb-0 h-full">
      <CardHeader>
        <CardDescription>Subscriptions</CardDescription>
        <CardTitle className="text-3xl">+2,350</CardTitle>
        <CardDescription>+180.1% from last month</CardDescription>
      </CardHeader>
      <CardContent className="relative mt-auto flex-1 p-0 !px-0">
        <ChartContainer
          config={chartConfig}
          className="relative size-full h-[90px] [&_.recharts-responsive-container_>div]:w-full"
        >
          <AreaChart
            data={data}
            margin={{
              left: 0,
              right: 0,
            }}
            className="w-full  h-[130px]"
          >
            <Area
              dataKey="subscription"
              fill="var(--color-subscription)"
              fillOpacity={0.05}
              stroke="var(--color-subscription)"
              strokeWidth={2}
              type="monotone"
              className="w-full"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
