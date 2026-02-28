import { randomBytes, createHmac } from "crypto";

// WARNING: Using a fallback secret is insecure. Set JWT_SECRET in your environment.
// In production, the application should fail to start if this is not configured.
const CSRF_SECRET = process.env.JWT_SECRET ?? "fallback-csrf-secret-change-in-production";

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
