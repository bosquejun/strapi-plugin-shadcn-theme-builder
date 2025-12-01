import { useThemePresets } from '../../contexts/theme-presets';
import { objectToCssVars } from '../../utils/cssVars';
import { TooltipProvider } from '../ui/tooltip';
import { CardsActivityGoal } from './cards/activity-goal';
import Card1 from './cards/card-1';
import Card2 from './cards/card-2';
import Card3 from './cards/card-3';
import { CardStats2 } from './cards/card-stats-2';
import { CardsStats } from './cards/stats';

export function TailwindPreview() {
  const { currentTheme, isDarkMode } = useThemePresets();

  const targetMode = isDarkMode ? 'dark' : 'light';

  const targetTheme = currentTheme?.[targetMode];

  if (!targetTheme) return null;

  return (
    <TooltipProvider>
      <section
        className="bg-background p-4 rounded-md  border border-border size-full tailwind-preview"
        style={{
          ...objectToCssVars(targetTheme),
          // fontSize: '1.6rem',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 col-span-1">
            <Card1 />
          </div>
          <div className="lg:col-span-2 col-span-1">
            <Card2 />
          </div>

          <div className="lg:col-span-2 col-span-1">
            <CardsStats />
          </div>
          <div className="lg:col-span-3 col-span-1">
            <Card3 />
          </div>
          <div className="lg:col-span-3 col-span-1">
            <CardStats2 />
          </div>
          <div className="lg:col-span-2 col-span-1">
            <CardsActivityGoal />
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
