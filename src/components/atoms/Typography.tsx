import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

interface TypographyProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className = '',
  as,
}) => {
  const tags: Record<Variant, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    caption: 'span',
  };

  const Component = as || tags[variant];

  const styles = {
    h1: 'text-4xl md:text-5xl font-bold tracking-tight text-foreground',
    h2: 'text-3xl font-semibold tracking-tight text-foreground',
    h3: 'text-xl font-medium tracking-normal text-foreground',
    body: 'text-base leading-relaxed text-gray-600 dark:text-gray-300',
    caption: 'text-sm text-gray-500 dark:text-gray-400',
  };

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
};
