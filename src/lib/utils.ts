// cn() — tiny className joiner. Skips falsy values so callers can pass
// `cond && "class"` inline without ternaries.
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
