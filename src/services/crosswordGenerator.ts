import { CrosswordWord } from '../types/activity';

export interface CrosswordCell {
  letter: string;
  numbers: number[];
}

export interface CrosswordGridResult {
  cells: (CrosswordCell | null)[][];
  rows: number;
  cols: number;
  placed: (CrosswordWord & { numero: number; row: number; col: number; direcao: 'horizontal' | 'vertical' })[];
  missing: CrosswordWord[];
}

function normalizeWord(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

function canPlaceWord(
  gridMap: Map<string, string>,
  word: string,
  placement: { row: number; col: number; dir: 'horizontal' | 'vertical' }
): boolean {
  const rStep = placement.dir === 'vertical' ? 1 : 0;
  const cStep = placement.dir === 'horizontal' ? 1 : 0;

  // Check cells before start and after end
  const beforeKey = `${placement.row - rStep},${placement.col - cStep}`;
  const afterKey = `${placement.row + rStep * word.length},${placement.col + cStep * word.length}`;
  if (gridMap.has(beforeKey) || gridMap.has(afterKey)) return false;

  for (let i = 0; i < word.length; i++) {
    const curRow = placement.row + rStep * i;
    const curCol = placement.col + cStep * i;
    const key = `${curRow},${curCol}`;
    const existing = gridMap.get(key);

    if (existing) {
      if (existing !== word[i]) return false;
    } else {
      // Check adjacent cells to ensure no parallel sticking
      const adj1 = placement.dir === 'horizontal' ? `${curRow - 1},${curCol}` : `${curRow},${curCol - 1}`;
      const adj2 = placement.dir === 'horizontal' ? `${curRow + 1},${curCol}` : `${curRow},${curCol + 1}`;
      if (gridMap.has(adj1) || gridMap.has(adj2)) return false;
    }
  }

  return true;
}

function writeWord(
  gridMap: Map<string, string>,
  word: string,
  placement: { row: number; col: number; dir: 'horizontal' | 'vertical' }
) {
  const rStep = placement.dir === 'vertical' ? 1 : 0;
  const cStep = placement.dir === 'horizontal' ? 1 : 0;
  for (let i = 0; i < word.length; i++) {
    gridMap.set(`${placement.row + rStep * i},${placement.col + cStep * i}`, word[i]);
  }
}

export function generateCrosswordGrid(inputWords: CrosswordWord[]): CrosswordGridResult {
  const validWords = inputWords
    .map((w) => ({
      ...w,
      palavra: normalizeWord(w.palavra),
      originalPalavra: w.palavra,
    }))
    .filter((w) => w.palavra.length >= 2)
    .sort((a, b) => b.palavra.length - a.palavra.length);

  const gridMap = new Map<string, string>();
  const placed: (CrosswordWord & { row: number; col: number; direcao: 'horizontal' | 'vertical' })[] = [];
  const missing: CrosswordWord[] = [];

  for (const item of validWords) {
    let bestPlacement: { row: number; col: number; dir: 'horizontal' | 'vertical' } | null = null;

    if (placed.length === 0) {
      bestPlacement = { row: 0, col: 0, dir: 'horizontal' };
    } else {
      outerLoop: for (const placedItem of placed) {
        for (let pIdx = 0; pIdx < placedItem.palavra.length; pIdx++) {
          for (let wIdx = 0; wIdx < item.palavra.length; wIdx++) {
            if (placedItem.palavra[pIdx] !== item.palavra[wIdx]) continue;

            const newDir: 'horizontal' | 'vertical' =
              placedItem.direcao === 'horizontal' ? 'vertical' : 'horizontal';

            const candidate = {
              row:
                newDir === 'vertical'
                  ? placedItem.row - wIdx
                  : placedItem.row + (placedItem.direcao === 'vertical' ? pIdx : 0),
              col:
                newDir === 'horizontal'
                  ? placedItem.col - wIdx
                  : placedItem.col + (placedItem.direcao === 'horizontal' ? pIdx : 0),
              dir: newDir,
            };

            if (canPlaceWord(gridMap, item.palavra, candidate)) {
              bestPlacement = candidate;
              break outerLoop;
            }
          }
        }
      }
    }

    if (!bestPlacement) {
      missing.push(item);
      continue;
    }

    writeWord(gridMap, item.palavra, bestPlacement);
    placed.push({
      ...item,
      row: bestPlacement.row,
      col: bestPlacement.col,
      direcao: bestPlacement.dir,
    });
  }

  if (placed.length === 0) {
    return { cells: [], rows: 0, cols: 0, placed: [], missing };
  }

  // Calculate grid bounds
  let minRow = Infinity;
  let minCol = Infinity;
  let maxRow = -Infinity;
  let maxCol = -Infinity;

  for (const key of gridMap.keys()) {
    const [r, c] = key.split(',').map(Number);
    if (r < minRow) minRow = r;
    if (c < minCol) minCol = c;
    if (r > maxRow) maxRow = r;
    if (c > maxCol) maxCol = c;
  }

  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;

  const cells: (CrosswordCell | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null)
  );

  for (const [key, letter] of gridMap.entries()) {
    const [r, c] = key.split(',').map(Number);
    cells[r - minRow][c - minCol] = { letter, numbers: [] };
  }

  // Adjust placed coordinates and assign clue numbers
  const shiftedPlaced = placed.map((item) => ({
    ...item,
    row: item.row - minRow,
    col: item.col - minCol,
  }));

  // Sort top-to-bottom, left-to-right for consistent numbering
  shiftedPlaced.sort((a, b) => a.row - b.row || a.col - b.col);

  const coordToNum = new Map<string, number>();
  let nextNum = 1;
  const numberedPlaced: (CrosswordWord & {
    numero: number;
    row: number;
    col: number;
    direcao: 'horizontal' | 'vertical';
  })[] = [];

  for (const item of shiftedPlaced) {
    const coordKey = `${item.row},${item.col}`;
    let num = coordToNum.get(coordKey);
    if (!num) {
      num = nextNum++;
      coordToNum.set(coordKey, num);
    }

    const cell = cells[item.row][item.col];
    if (cell && !cell.numbers.includes(num)) {
      cell.numbers.push(num);
    }

    numberedPlaced.push({
      ...item,
      numero: num,
    });
  }

  return {
    cells,
    rows,
    cols,
    placed: numberedPlaced,
    missing,
  };
}
