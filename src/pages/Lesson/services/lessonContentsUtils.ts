/**
 * Utility functions for handling lesson content
 */

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
  
  // Simple regex to detect HTML tags
  const htmlRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlRegex.test(content);
}