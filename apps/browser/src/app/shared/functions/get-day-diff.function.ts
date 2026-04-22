const DAY_MS = 1000 * 60 * 60 * 24;

const normalizeDate = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  return result;
};

export const getDayDiff = (a: Date, b: Date): number => Math.floor(
    (normalizeDate(a).valueOf() - normalizeDate(b).valueOf()) / DAY_MS,
  );
