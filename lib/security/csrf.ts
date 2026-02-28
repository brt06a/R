import { randomBytes, createHmac } from "crypto";

function getCsrfSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET environment variable must be set in production");
    }
    return "fallback-csrf-secret-change-in-production";
  }
  return secret;
}

const CSRF_SECRET = getCsrfSecret();

export function generateCsrfToken(): string {
  const token = randomBytes(32).toString("hex");
  const hmac = createHmac("sha256", CSRF_SECRET);
  hmac.update(token);
  const signature = hmac.digest("hex");
  return `${token}.${signature}`;
}

export function validateCsrfToken(token: string): boolean {
  try {
    const [value, signature] = token.split(".");
    if (!value || !signature) return false;
    const hmac = createHmac("sha256", CSRF_SECRET);
    hmac.update(value);
    const expectedSignature = hmac.digest("hex");
    return expectedSignature === signature;
  } catch {
    return false;
  }
}
