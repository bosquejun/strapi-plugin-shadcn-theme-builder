import { useNotification } from '@strapi/admin/strapi-admin';
import { Badge } from '@strapi/design-system';
import { CheckIcon, CopyIcon } from 'lucide-react';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'styled-components';
import useLocalStorage from '../hooks/use-local-storage';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

type CodeBlockContextType = {
  code: string;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: '',
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  children?: ReactNode;
};

export const CodeBlock = ({
  code,
  language,
  showLineNumbers = true,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const [mode] = useLocalStorage('STRAPI_THEME', 'dark');
  const theme = useTheme();
  const { toggleNotification } = useNotification();

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div className={cn('bg-(--strapi-neutral100) border ', className)} {...props}>
        <div className="flex justify-between items-center p-2">
          <Badge>index.css</Badge>
          <CodeBlockCopyButton
          // size="default"
          // className="bg-(--strapi-button-primary600) text-(--strapi-button-neutral0)"
          />
        </div>
        <div
          className="relative w-full max-h-[40vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-(--strapi-neutral150)
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb:hover]:bg-(--strapi-neutral200)"
        >
          <SyntaxHighlighter
            className="overflow-hidden [&_span]:text-base"
            codeTagProps={{
              className: 'font-mono text-sm',
            }}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '1rem',
              background: theme.colors.neutral100,
              color: theme.colors.neutral1000,
              border: 'hsl(var(--border))',
            }}
            language={language}
            lineNumberStyle={{
              color: theme.colors.primary500,
              paddingRight: '1rem',
              minWidth: '2.5rem',
            }}
            showLineNumbers={showLineNumbers}
            style={mode === 'dark' ? oneDark : oneLight}
          >
            {code}
          </SyntaxHighlighter>
          {children && (
            <div className="absolute top-2 right-2 flex items-center gap-2">{children}</div>
          )}
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard.writeText) {
      onError?.(new Error('Clipboard API not available'));
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn('shrink-0 bg-(--strapi-primary500) text-(--button-neutral0)', className)}
      onClick={copyToClipboard}
      {...props}
    >
      <Icon size={14} /> {isCopied ? 'Copied' : 'Copy'}
    </Button>
  );
};
