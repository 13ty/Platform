export function validateDescription(text: string, maxLength = 100): { valid: boolean; error?: string } {
  const trimmed = text.trim();

  if (trimmed.length === 0 || trimmed.length > maxLength) {
    return {
      valid: false,
      error: `Description must be between 1 and ${maxLength} characters`
    };
  }

  if (!/^[a-zA-Z0-9\s\-_.,!?()[\]{}'"]+$/.test(trimmed)) {
    return {
      valid: false,
      error: 'Description can only contain letters, numbers, spaces, and basic punctuation'
    };
  }

  return { valid: true };
}
