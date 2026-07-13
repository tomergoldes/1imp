import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  isAdmin?: boolean;
}

/**
 * Returns the authenticated session user, or null if not logged in.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as any;
  if (!user.id) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin === true,
  };
}

/**
 * Returns the authenticated admin user, or null if not an admin.
 */
export async function getAdminUser(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  if (!user?.isAdmin) return null;
  return user;
}
