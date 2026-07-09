import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Security Check: Only allow if logged in AND isAdmin is true
  if (!session || !(session.user as any)?.isAdmin) {
    redirect("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#05030A", color: "white" }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflowY: "auto", padding: "3rem" }}>
        {children}
      </main>
    </div>
  );
}
