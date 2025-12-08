import { compare, hash } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import type { NewAdmin } from "@/db/schema";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return compare(plainTextPassword, hashedPassword);
}

type AdminSessionData = {
  admin: { id: number };
  expires: string;
};

export async function signAdminToken(payload: AdminSessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function verifyAdminToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as AdminSessionData;
}

export async function getAdminSession() {
  const session = (await cookies()).get("admin_session")?.value;
  if (!session) return null;
  return await verifyAdminToken(session);
}

export async function setAdminSession(admin: NewAdmin) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: AdminSessionData = {
    admin: { id: admin.id! },
    expires: expiresInOneDay.toISOString(),
  };
  const encryptedSession = await signAdminToken(session);
  (await cookies()).set("admin_session", encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
  });
}

export async function clearAdminSession() {
  (await cookies()).delete({
    name: "admin_session",
    path: "/admin",
  });
}
