import { Typography } from '@strapi/design-system';
import { Eye, Faders, Loader } from '@strapi/icons';
import { useIntl } from 'react-intl';

import { Page, useMediaQuery } from '@strapi/admin/strapi-admin';
import { Box, Flex, Grid, Tabs } from '@strapi/design-system';
import { useIsDesktop } from '@strapi/strapi/admin';
import { lazy, Suspense } from 'react';
import ColorThemesSelection from '../components/color-themes-selection';
import { ControlPanel } from '../components/control-panel';
import { ThemeCode } from '../components/theme-code';
import ToggleTailwindMode from '../components/toggle-tailwind-mode';
import { getTranslation } from '../utils/getTranslation';

const LazyTailwindPreview = lazy(() => import('../components/tailwind-preview'));

const HomePage = () => {
  const { formatMessage } = useIntl();
  const isDesktop = useIsDesktop();

  const twoRows = useMediaQuery('(max-width: 1500px)');

  return (
    <Page.Main>
      <Flex
        paddingTop={{
          initial: 4,
          large: 8,
          medium: 6,
          small: 4,
        }}
        paddingBottom={{
          initial: 4,
          large: 8,
          medium: 6,
          small: 4,
        }}
        paddingLeft={{
          initial: 6,
          large: 10,
          medium: 8,
          small: 6,
        }}
        paddingRight={{
          initial: 6,
          large: 10,
          medium: 8,
          small: 6,
        }}
        direction="column"
        gap={{
          initial: 2,
          large: 6,
          medium: 4,
          small: 2,
        }}
        alignItems="flex-start"
      >
        <Flex>
          <Typography variant="alpha">
            {formatMessage({ id: getTranslation('plugin.name') })}
          </Typography>
        </Flex>
        {isDesktop ? (
          <Grid.Root
            gap={{
              initial: 2,
              large: 6,
              medium: 4,
              small: 2,
            }}
          >
            <Grid.Item background="neutral0" padding={4} col={8} shadow="tableShadow">
              <Flex direction="column" gap={2} width="100%" height="100%" alignItems="flex-start">
                <Flex
                  direction={twoRows ? 'column' : 'row'}
                  gap={2}
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Flex gap={2} width="100%" flex={0}>
                    <ColorThemesSelection />
                  </Flex>
                  <Flex></Flex>
                  <Flex gap={2} width="100%" justifyContent="flex-end" flex={1}>
                    <ToggleTailwindMode />
                    <ThemeCode />
                  </Flex>
                </Flex>
                <Flex gap={2} alignItems="center" width="100%" height="100%">
                  <Suspense
                    fallback={
                      <Box width="100%" height="100%">
                        <Loader />
                      </Box>
                    }
                  >
                    <LazyTailwindPreview />
                  </Suspense>
                </Flex>
              </Flex>
            </Grid.Item>
            <Grid.Item background="neutral0" padding={4} col={4} shadow="tableShadow">
              <ControlPanel />
            </Grid.Item>
          </Grid.Root>
        ) : (
          <Tabs.Root value="controls" defaultValue="controls">
            <Tabs.List aria-label="Mobile Tabs View">
              <Tabs.Trigger value="controls">
                <Flex gap={2} justifyContent="center">
                  <Faders />
                  Controls
                </Flex>
              </Tabs.Trigger>
              <Tabs.Trigger value="Preview">
                <Flex gap={2} justifyContent="center">
                  <Eye />
                  Preview
                </Flex>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="controls">
              <Box padding={4}>
                <Typography tag="p">The default settings for your attribute</Typography>
              </Box>
            </Tabs.Content>
            <Tabs.Content value="preview">
              <Box padding={4}>
                <Typography tag="p">The advanced settings for your attribute</Typography>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        )}
        {/* <MobileView>
          
        </MobileView>

        <DesktopView>
         
        </DesktopView> */}
      </Flex>
    </Page.Main>
  );
};

export { HomePage };
