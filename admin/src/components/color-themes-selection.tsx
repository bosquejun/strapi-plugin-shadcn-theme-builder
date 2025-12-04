import { Check, ChevronDownIcon } from 'lucide-react';
import { Fragment, useId, useMemo, useState } from 'react';

import {
  Badge,
  Flex,
  IconButton,
  IconButtonGroup,
  Popover,
  Button as StrapiButton,
  Typography,
} from '@strapi/design-system';
import { ArrowLeft, ArrowRight } from '@strapi/icons';
import { getThemeColorPalette, PresetTheme, useThemePresets } from '../contexts/theme-presets';
import { ColorPalette } from './color-palette';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';

type GroupedTheme = {
  group: string;
  items: PresetTheme[];
};

export default function ColorThemesSelection() {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const {
    themes,
    currentTheme,
    currentColorPalette,
    updateCurrentThemeById,
    isDarkMode,
    activeTheme,
    setActiveThemeById,
  } = useThemePresets();

  const navigationProps = useMemo(() => {
    const currentIndex = themes.findIndex((theme) => theme.id === currentTheme?.id);
    return {
      isFirst: currentIndex === 0,
      isLast: currentIndex === themes.length - 1,
      previousTheme: themes[currentIndex - 1] || null,
      nextTheme: themes[currentIndex + 1] || null,
    };
  }, [themes]);

  const handlePreviousTheme = () => {
    if (navigationProps.previousTheme) {
      updateCurrentThemeById(navigationProps.previousTheme.id);
    }
  };

  const handleNextTheme = () => {
    if (navigationProps.nextTheme) {
      updateCurrentThemeById(navigationProps.nextTheme.id);
    }
  };

  const groupedThemes = useMemo(
    () =>
      themes.reduce((groups: GroupedTheme[], theme: PresetTheme) => {
        const existingGroup = groups.find((g) => g.group === theme.type);

        if (!existingGroup) {
          const newGroup: GroupedTheme = {
            group: theme.type,
            items: [theme],
          };
          if (theme.type === 'new') {
            groups.unshift(newGroup);
          } else {
            groups.push(newGroup);
          }
        } else {
          existingGroup.items.push(theme);
        }

        return groups;
      }, [] as GroupedTheme[]),
    [themes, currentTheme, currentColorPalette]
  );

  return (
    <>
      <Flex grow={1} width="100%" minWidth="40rem">
        <Popover.Root onOpenChange={setOpen} open={open}>
          <Popover.Trigger asChild>
            <Button
              aria-expanded={open}
              className="hover:[outline:2px_solid_var(--strapi-primary600)] hover:[outline-offset:2px] text-lg w-full min-w-[30rem] h-[40px] justify-between hover:bg-(--strapi-neutral0) border-(--strapi-neutral200) bg-(--strapi-neutral0) px-3 font-normal outline-none outline-offset-0 [&_span]:text-(--strapi-button-neutral0) focus-visible:outline-[3px]"
              id={id}
              role="combobox"
              variant="outline"
            >
              {currentTheme ? (
                <span className="flex min-w-0 items-center gap-2">
                  <ColorPalette colors={currentColorPalette} label={currentTheme.name} />
                </span>
              ) : (
                <span className="text-muted-foreground">Select theme</span>
              )}
              <ChevronDownIcon
                aria-hidden="true"
                className="shrink-0 text-(--strapi-button-neutral0) text-lg !size-6"
                size={20}
              />
            </Button>
          </Popover.Trigger>
          <Popover.Content
            align="start"
            className="[&_*]:text-(--strapi-neutral1000) w-full min-w-[var(--radix-popper-anchor-width)]"
          >
            <Command className="border-(--strapi-neutral200) bg-(--strapi-neutral0) lg:min-w-[40rem]">
              <CommandInput
                wrapperClassName="h-16 py-2.5 border-(--strapi-neutral200) [&_*]:text-lg"
                placeholder="Search theme..."
              />
              <CommandList
                className="[&::-webkit-scrollbar]:w-2.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-(--strapi-neutral200)
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb:hover]:bg-(--strapi-neutral300)"
              >
                <CommandEmpty className="text-lg">No theme found.</CommandEmpty>
                {groupedThemes.map((group) => (
                  <Fragment key={group.group}>
                    <CommandGroup
                      heading={group.group}
                      className="[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:py-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-base [&_[cmdk-group-heading]]:text-(--strapi-neutral400)"
                    >
                      {group.items.map((theme) => (
                        <CommandItem
                          key={theme.id}
                          onSelect={(currentValue) => {
                            updateCurrentThemeById(currentValue);
                            setOpen(false);
                          }}
                          value={theme.id}
                          className="py-3.5 !font-normal data-[selected=true]:bg-(--strapi-neutral100) data-[selected=true]:text-(--strapi-neutral-1000)"
                        >
                          <div className="flex justify-between items-center w-full [&>*:last-child]:text-(--strapi-neutral400) [&>*:last-child]:text-sm">
                            <div className="flex gap-2 items-center">
                              <ColorPalette
                                colors={getThemeColorPalette(theme, isDarkMode)}
                                label={theme.name}
                              />
                              {theme?.id === activeTheme?.id ? (
                                <Badge size="S" backgroundColor="success500">
                                  Active
                                </Badge>
                              ) : theme.id === currentTheme?.id ? (
                                <Check className="!size-6" />
                              ) : null}
                            </div>
                            {theme?.id !== 'custom' && (
                              <Typography variant="sigma">By {theme.source}</Typography>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Fragment>
                ))}
              </CommandList>
            </Command>
          </Popover.Content>
        </Popover.Root>
      </Flex>
      <Flex gap={2} flex="none">
        <IconButtonGroup>
          <IconButton
            variant="secondary"
            size="L"
            onClick={handlePreviousTheme}
            disabled={navigationProps.isFirst}
          >
            <ArrowLeft />
          </IconButton>
          <IconButton
            variant="secondary"
            size="L"
            onClick={handleNextTheme}
            disabled={navigationProps.isLast}
          >
            <ArrowRight />
          </IconButton>
        </IconButtonGroup>
        <StrapiButton
          size="L"
          variant="secondary"
          onClick={() => {
            if (!currentTheme?.id) return;
            setActiveThemeById(currentTheme?.id!);
          }}
          disabled={currentTheme?.type === 'new' || currentTheme?.id === activeTheme?.id}
        >
          Set Active Theme
        </StrapiButton>
      </Flex>
    </>
  );
}
