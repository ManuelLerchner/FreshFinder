export function mergePreferences(
  oldPreferences: { [key: string]: number },
  merge: { [key: string]: number }
): { [key: string]: number } {
  const newPreferences = { ...oldPreferences };
  for (const key in merge) {
    if (newPreferences[key]) {
      newPreferences[key] += merge[key];
    } else {
      newPreferences[key] = merge[key];
    }
  }
  return newPreferences;
}
