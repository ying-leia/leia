// Brand Colors - Centralized color system for NAIA
export const colors = {
  // Primary brand colors
  primary: '#5F493B',           // Primary button color (warm brown)
  primaryDark: '#2f1c11',       // Deep mocha (text, dark elements)
  
  // Background colors
  background: '#F8F5F2',        // Main site background
  sectionBackground: '#e7e2d5', // Section backgrounds (soft cream)
  sectionBackgroundHover: '#dcd4c3', // Hover state for section backgrounds
  
  // Text colors
  textPrimary: '#2f1c11',       // Primary text color
  textSecondary: '#5f493b',     // Secondary text color (muted brown)
  textLight: '#e7e2d5',         // Light text for dark backgrounds
  
  // Interactive colors
  white: '#ffffff',
  borderLight: '#dcd4c3',       // Light borders
  
  // State colors (for future use)
  success: '#5F493B',
  error: '#d32f2f',
  warning: '#ff9800',
} as const;

// CSS custom properties for use in Tailwind or direct CSS
export const cssVariables = `
  :root {
    --color-primary: ${colors.primary};
    --color-primary-dark: ${colors.primaryDark};
    --color-background: ${colors.background};
    --color-section-background: ${colors.sectionBackground};
    --color-section-background-hover: ${colors.sectionBackgroundHover};
    --color-text-primary: ${colors.textPrimary};
    --color-text-secondary: ${colors.textSecondary};
    --color-text-light: ${colors.textLight};
    --color-white: ${colors.white};
    --color-border-light: ${colors.borderLight};
  }
`;

// Tailwind class helpers
export const tailwindColors = {
  primary: `[${colors.primary}]`,
  primaryDark: `[${colors.primaryDark}]`,
  background: `[${colors.background}]`,
  sectionBackground: `[${colors.sectionBackground}]`,
  sectionBackgroundHover: `[${colors.sectionBackgroundHover}]`,
  textPrimary: `[${colors.textPrimary}]`,
  textSecondary: `[${colors.textSecondary}]`,
  textLight: `[${colors.textLight}]`,
  borderLight: `[${colors.borderLight}]`,
}; 