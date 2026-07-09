import { prisma } from "@/lib/prisma";
import { UsersTable } from "./UsersTable";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  // Fetch users with their video count
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      _count: {
        select: { videos: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em", margin: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(232,53,90,0.1)", color: "#E8355A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={20} />
            </div>
            Users Management
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: "0.5rem 0 0 0" }}>
            Manage your platform's users, view their activity, and handle permissions.
          </p>
        </div>
      </div>

      <UsersTable initialUsers={users} />
    </div>
  );
}
