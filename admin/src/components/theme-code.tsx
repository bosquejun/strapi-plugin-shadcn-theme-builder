import { Button, Modal } from '@strapi/design-system';
import { Braces } from 'lucide-react';
import { useThemePresets } from '../contexts/theme-presets';
import { themeToCssFileVariables } from '../utils/cssVars';
import { CodeBlock } from './code-block';

export const ThemeCode = () => {
  const { currentTheme } = useThemePresets();
  if (!currentTheme) return null;

  console.log(currentTheme);
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button variant="ghost" size="L" startIcon={<Braces size={14} />}>
          Code
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Theme Code</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CodeBlock
            code={`
${themeToCssFileVariables(currentTheme.light)}

${themeToCssFileVariables(currentTheme.dark, '.dark')}
              `}
            language="css"
            className="h-full rounded-none border-0"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="tertiary">Close</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};
