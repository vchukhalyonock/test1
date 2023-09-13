import { NEST_SYMBOL, NEST_SYMBOLS_NUMBER } from './formatter.consts';

export function createObjectFromLines(
  lines: string[],
): Record<string, string | number> {
  return lines.reduce((acc, line) => {
    const parts = line.split('=');
    acc[parts[0].trim()] = parts[1].trim();
    return acc;
  }, {});
}

export function nestLevel(line: string): number {
  let multiplier = 0;
  let nestString = '';
  let level = 0;
  while (line.startsWith(nestString)) {
    level++;
    multiplier += NEST_SYMBOLS_NUMBER;
    nestString = NEST_SYMBOL.repeat(multiplier);
  }
  return level - 1;
}

export function takeAllLinesForObject(
  lines: string[],
  index: number,
  level: number,
): { lines: string[]; index: number } {
  const result = [];
  let i = index;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const currentLevel = nestLevel(line);
    if (currentLevel !== level) break;
    if (!line.includes('=')) break;
    result.push(line);
  }
  return {
    lines: result,
    index: i,
  };
}
