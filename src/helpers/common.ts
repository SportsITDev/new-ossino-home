import { z } from 'zod';

export const sleep = async (ms: number) =>
  new Promise<void>((resolve) => {
    const id = setTimeout(() => {
      resolve();
      clearTimeout(id);
    }, ms);
  });

export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must have at least one uppercase letter')
  .regex(/[a-z]/, 'Password must have at least one lowercase letter')
  .regex(/\d/, 'Password must have at least one number')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must have at least one special character',
  );

export const isValidValue = <T extends Record<string, unknown>>(
  obj: T,
  value: any,
): value is T[keyof T] => {
  return Object.values(obj).includes(value);
};

export const replaceString = (
  str: string,
  pattern: RegExp,
  replacement: string,
): string => {
  return str.replace(pattern, replacement);
};

export const cleanUrlSegment = (url: string): string => {

  if (url === "/" || url === "/home") {
    return 'home'
  }
  const lastSegment = url.split('/').filter(Boolean).pop();

  if (!lastSegment) return '';

  return replaceString(lastSegment, /-/g, ' ');
};

export const setScrollBarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.overflow = 'scroll';

  document.body.appendChild(outer);

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  document.body.removeChild(outer);

  document.body.style.setProperty(
    '--scrollbar-width',
    `${100 - widthWithScroll}px`,
  );
};
