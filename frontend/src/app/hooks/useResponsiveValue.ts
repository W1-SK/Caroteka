import { useEffect, useState } from "react";

type ResponsiveValues<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function getResponsiveValue<T>(width: number, values: ResponsiveValues<T>): T {
  if (width >= BREAKPOINTS.xl && values.xl !== undefined) return values.xl;
  if (width >= BREAKPOINTS.lg && values.lg !== undefined) return values.lg;
  if (width >= BREAKPOINTS.md && values.md !== undefined) return values.md;
  if (width >= BREAKPOINTS.sm && values.sm !== undefined) return values.sm;
  return values.base;
}

export function useResponsiveValue<T>(values: ResponsiveValues<T>): T {
  const [value, setValue] = useState<T>(values.base);

  useEffect(() => {
    function updateValue() {
      setValue(getResponsiveValue(window.innerWidth, values));
    }

    updateValue();
    window.addEventListener("resize", updateValue);

    return () => window.removeEventListener("resize", updateValue);
  }, [values]);

  return value;
}
