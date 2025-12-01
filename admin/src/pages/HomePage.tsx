import { Main, Typography } from '@strapi/design-system';
import { Eye, Faders } from '@strapi/icons';
import { useIntl } from 'react-intl';

import { Box, Button, Flex, Grid, Tabs } from '@strapi/design-system';
import { Braces } from 'lucide-react';
import { ControlPanel } from '../components/control-panel';
import { DesktopView } from '../components/desktop-view';
import { MobileView } from '../components/mobile-view';
import { TailwindPreview } from '../components/tailwind-preview';
import ToggleTailwindMode from '../components/toggle-tailwind-mode';
import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();
  return (
    <Main>
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
        <MobileView>
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
        </MobileView>

        <DesktopView>
          <Grid.Root
            gap={{
              initial: 2,
              large: 6,
              medium: 4,
              small: 2,
            }}
          >
            <Grid.Item background="neutral0" padding={4} col={4}>
              <ControlPanel />
            </Grid.Item>
            <Grid.Item background="neutral0" padding={4} col={8}>
              <Flex direction="column" gap={2} width="100%" height="100%" alignItems="flex-start">
                <Flex gap={1} alignItems="center" justifyContent="flex-end" width="100%">
                  <ToggleTailwindMode />
                  <Button variant="ghost" size="L" startIcon={<Braces size={14} />}>
                    Code
                  </Button>
                </Flex>
                <Flex gap={2} alignItems="center" width="100%">
                  <TailwindPreview />
                </Flex>
              </Flex>
            </Grid.Item>
          </Grid.Root>
        </DesktopView>
      </Flex>
    </Main>
  );
};

export { HomePage };
