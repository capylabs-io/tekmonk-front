// 1. Vietnamese normalization utility (removes accents)
function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// 2. Forbidden words list (customize this!)
const forbiddenWords = [
  "chửi thề",
  "tục tĩu",
  "bậy bạ",
  "đồ ngu",
  "đồ ngốc",
  "nig",
];

// Normalize forbidden words once
const normalizedForbidden = forbiddenWords.map(normalizeVietnamese);

export const containsForbiddenWords = (text: string): boolean => {
  const normalizedText = normalizeVietnamese(text);
  return normalizedForbidden.some((word) => normalizedText.includes(word));
};
