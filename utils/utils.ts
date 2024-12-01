import { EMPTY_INPUT_ERROR, INVALID_EMAIL_ERROR } from "@/constants/errors";

export function safeParseJson<T extends object>(str: unknown): T | null {
  try {
    return JSON.parse(str as string);
  } catch (e) {
    return null;
  }
}

export const isValidEmail = (email: string) => {
  const regex = new RegExp(
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
  );
  if (email.length === 0 || !regex.test(email)) {
    return false;
  }
  return true;
};
