import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Normalizes newline characters in content
 * This helps handle different newline formats (\n, \r\n, \r)
 */
export function normalizeNewlines(content: string): string {
  if (!content) return '';

  // Replace \r\n and \r with \n
  return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * Detects if content contains HTML tags
 */
export function containsHtml(content: string): boolean {
  if (!content) return false;

  // Enhanced HTML detection specifically checking for various HTML elements
  // Including heading tags, paragraph tags, lists, etc.
  const htmlRegex = /<\/?(?:h[1-6]|p|ul|ol|li|div|span|blockquote|br|strong|em|a|table|tr|td|th)[^>]*>|&[a-z]+;/i;
  return htmlRegex.test(content);
}

interface TextContentRendererProps {
  content: string;
  className?: string;
  allowHtml?: boolean;
}

/**
 * A component that renders text content with proper handling of newline characters (\n)
 * and HTML content, including heading tags.
 */
export const TextContentRenderer: React.FC<TextContentRendererProps> = ({ content, className, allowHtml = false }) => {
  if (!content) {
    return null;
  }

  // Normalize newlines to ensure consistent rendering
  const normalizedContent = normalizeNewlines(content);

  // Check if content has HTML tags and if HTML rendering is allowed
  const hasHtml = allowHtml && containsHtml(normalizedContent);

  // If content has HTML and HTML is allowed, render with dangerouslySetInnerHTML
  if (hasHtml) {
    return (
      <div
        className={cn('prose max-w-full text-base text-[#1E1E1E]', className)}
        dangerouslySetInnerHTML={{ __html: normalizedContent }}
      />
    );
  }

  // Otherwise, handle newlines by splitting the text and adding <br /> elements
  const textWithLineBreaks = normalizedContent.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));

  return <div className={cn('text-base text-[#1E1E1E]', className)}>{textWithLineBreaks}</div>;
};
