import { prisma } from "@/lib/prisma";
import { Users, Video, Eye, DollarSign, TrendingUp } from "lucide-react";
import { MetricCard } from "./components/MetricCard";
import { RevenueChart } from "./components/RevenueChart";

export default async function AdminDashboardPage() {
  // Fetch real data for users and videos
  const totalUsers = await prisma.user.count();
  const totalVideos = await prisma.video.count();

  // Aggregate total views from all analytics
  const analytics = await prisma.analytics.aggregate({
    _sum: { views: true }
  });
  const totalViews = analytics._sum.views || 0;

  // Mock revenue data for now until Stripe is integrated
  const totalRevenue = totalUsers * 19; // Mock: $19 per user average

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.02em", margin: 0 }}>
            Overview
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: "0.25rem 0 0 0" }}>Real-time metrics and platform health.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <MetricCard title="Total Users" value={totalUsers.toLocaleString()} icon={<Users size={20} />} trend="+12%" color="#34A853" />
        <MetricCard title="Videos Generated" value={totalVideos.toLocaleString()} icon={<Video size={20} />} trend="+24%" color="#E8355A" />
        <MetricCard title="Total Profile Views" value={totalViews.toLocaleString()} icon={<Eye size={20} />} trend="+18%" color="#6361B8" />
        <MetricCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<DollarSign size={20} />} trend="+5%" color="#FABB05" isMock />
      </div>

      {/* Main Chart Area */}
      <RevenueChart />
    </div>
  );
}
