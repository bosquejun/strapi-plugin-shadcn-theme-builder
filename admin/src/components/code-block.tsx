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

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={cn(
          'bg-background text-foreground relative w-full overflow-hidden rounded-md border',
          className
        )}
        {...props}
      >
        <div className="relative min-w-1/2">
          <SyntaxHighlighter
            className="overflow-hidden"
            codeTagProps={{
              className: 'font-mono text-sm',
            }}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              background: theme.colors.neutral100,
              color: theme.colors.neutral1000,
              // background: 'hsl(var(--background))',
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
      className={cn('shrink-0', className)}
      onClick={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};
