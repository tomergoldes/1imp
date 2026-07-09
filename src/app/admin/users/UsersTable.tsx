"use client";

import { useState } from "react";
import { Search, MoreVertical, Trash2, Shield, User as UserIcon } from "lucide-react";
import { deleteUser, toggleAdminStatus } from "./actions";

type UserData = {
  id: string;
  name: string | null;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  _count: { videos: number };
};

export function UsersTable({ initialUsers }: { initialUsers: UserData[] }) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    setLoadingId(id);
    const res = await deleteUser(id);
    if (res.success) {
      setUsers(users.filter(u => u.id !== id));
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  };

  const handleToggleAdmin = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    const res = await toggleAdminStatus(id, currentStatus);
    if (res.success) {
      setUsers(users.map(u => u.id === id ? { ...u, isAdmin: !currentStatus } : u));
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  };

  return (
    <div style={{ background: "rgba(13, 10, 30, 0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
      
      {/* Search Bar */}
      <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "1rem" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
          <Search size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: "100%", padding: "0.875rem 1rem 0.875rem 3rem", 
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              color: "white", outline: "none", fontSize: "0.875rem",
              transition: "border-color 200ms"
            }}
            onFocus={(e) => e.target.style.borderColor = "#E8355A"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600 }}>User</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600 }}>Role</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600 }}>Videos</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600 }}>Joined</th>
              <th style={{ padding: "1rem 1.5rem", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                  No users found matching "{search}"
                </td>
              </tr>
            ) : filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background 200ms" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "1rem 1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #E8355A, #6361B8)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "1rem" }}>
                      {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={18} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "white" }}>{user.name || "Unknown User"}</div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <span style={{ 
                    display: "inline-flex", alignItems: "center", gap: "0.25rem",
                    padding: "0.25rem 0.75rem", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600,
                    background: user.isAdmin ? "rgba(232, 53, 90, 0.1)" : "rgba(255,255,255,0.05)",
                    color: user.isAdmin ? "#E8355A" : "rgba(255,255,255,0.6)",
                    border: `1px solid ${user.isAdmin ? "rgba(232,53,90,0.2)" : "rgba(255,255,255,0.1)"}`
                  }}>
                    {user.isAdmin && <Shield size={12} />}
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td style={{ padding: "1rem 1.5rem", color: "white" }}>
                  {user._count.videos}
                </td>
                <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <button 
                      onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                      disabled={loadingId === user.id}
                      style={{ 
                        padding: "0.5rem", background: "transparent", border: "none", color: "rgba(255,255,255,0.6)",
                        cursor: "pointer", transition: "color 200ms", borderRadius: 6
                      }}
                      title={user.isAdmin ? "Remove Admin" : "Make Admin"}
                      onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                    >
                      <Shield size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      disabled={loadingId === user.id}
                      style={{ 
                        padding: "0.5rem", background: "transparent", border: "none", color: "rgba(255,255,255,0.4)",
                        cursor: "pointer", transition: "color 200ms", borderRadius: 6
                      }}
                      title="Delete User"
                      onMouseEnter={(e) => e.currentTarget.style.color = "#E8355A"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
