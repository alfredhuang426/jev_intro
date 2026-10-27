import { SignJWT, jwtVerify } from "jose";

// proxy 與 server action 共用，不能 import next/headers

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export function signToken(sub: string) {
  return new SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key);
}

// 簽章錯誤、過期或沒有 token 都回 null
export async function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}
