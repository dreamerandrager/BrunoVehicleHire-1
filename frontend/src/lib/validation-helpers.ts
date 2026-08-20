function isLetter(char: string): boolean {
  return char.toLowerCase() !== char.toUpperCase();
}

function isDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}

export function isAlphanumeric(value: string): boolean {
  return value.length > 0 && Array.from(value).every((c) => isLetter(c) || isDigit(c));
}

export function isWordsOfLettersAndDigits(value: string): boolean {
  if (!value || value.startsWith(" ") || value.endsWith(" ") || value.includes("  ")) {
    return false;
  }
  return Array.from(value).every((c) => isLetter(c) || isDigit(c) || c === " ");
}

export function isPersonName(value: string): boolean {
  if (!value || !isLetter(value[0]) || !isLetter(value[value.length - 1])) {
    return false;
  }
  return Array.from(value).every((c) => isLetter(c) || c === " " || c === "'" || c === "-");
}
