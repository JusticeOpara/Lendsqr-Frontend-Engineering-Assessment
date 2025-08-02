// lib/fonts.ts
import { Work_Sans } from 'next/font/google';

// Create separate font instances with different weights
export const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
});