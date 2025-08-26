interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR = 'il1Lo0O';

export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  
  if (options.includeUppercase) charset += UPPERCASE;
  if (options.includeLowercase) charset += LOWERCASE;
  if (options.includeNumbers) charset += NUMBERS;
  if (options.includeSymbols) charset += SYMBOLS;
  
  if (options.excludeSimilar) {
    charset = charset.split('').filter(char => !SIMILAR.includes(char)).join('');
  }
  
  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }
  
  // Use Web Crypto API for cryptographically secure random generation
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length];
  }
  
  return password;
}

export function calculateEntropy(password: string): number {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);
  
  let charsetSize = 0;
  if (hasLowercase) charsetSize += 26;
  if (hasUppercase) charsetSize += 26;
  if (hasNumbers) charsetSize += 10;
  if (hasSymbols) charsetSize += 32; // Approximate
  
  return Math.log2(Math.pow(charsetSize, password.length));
}

export function estimateTimeToCrack(password: string): string {
  const entropy = calculateEntropy(password);
  const guessesPerSecond = 1e12; // 1 trillion guesses per second (optimistic for attackers)
  const secondsToCrack = Math.pow(2, entropy - 1) / guessesPerSecond;
  
  if (secondsToCrack < 60) {
    return `${Math.round(secondsToCrack)} seconds`;
  } else if (secondsToCrack < 3600) {
    return `${Math.round(secondsToCrack / 60)} minutes`;
  } else if (secondsToCrack < 86400) {
    return `${Math.round(secondsToCrack / 3600)} hours`;
  } else if (secondsToCrack < 31536000) {
    return `${Math.round(secondsToCrack / 86400)} days`;
  } else if (secondsToCrack < 31536000000) {
    return `${Math.round(secondsToCrack / 31536000)} years`;
  } else {
    return `${(secondsToCrack / 31536000000).toExponential(2)} billion years`;
  }
}