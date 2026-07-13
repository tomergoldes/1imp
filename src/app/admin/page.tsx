import { prisma } from "@/lib/prisma";
import { Users, Video, Eye, DollarSign, TrendingUp } from "lucide-react";
import { MetricCard } from "./components/MetricCard";
import { RevenueChart } from "./components/RevenueChart";

export default async function AdminDashboardPage() {
  // Fetch real data for users and videos
  const totalUsers = await prisma.user.count();
  const totalVideos = await prisma.videoProject.count();

  // Aggregate total views from all analytics
  const analytics = await prisma.analytics.aggregate({
    _sum: { views: true }
  });
  const totalViews = analytics._sum.views || 0;

  // Financial calculations — prefer tracked render cost, fall back to an estimate.
  const EST_COST_PER_VIDEO = 0.40;
  const renderCostAgg = await prisma.videoProject.aggregate({ _sum: { renderCost: true } });
  const trackedCost = renderCostAgg._sum.renderCost || 0;
  const totalExpense = trackedCost > 0 ? trackedCost : totalVideos * EST_COST_PER_VIDEO;

  const payments = await prisma.payment.aggregate({
    _sum: { amount: true }
  });
  
  const grossIncome = payments._sum.amount || 0;
  
  // Calculate Stripe Fees: 2.9% + 30 cents per payment
  const paymentCount = await prisma.payment.count();
  const stripeFees = (grossIncome * 0.029) + (paymentCount * 0.30);
  
  const netIncome = grossIncome - stripeFees;
  const netProfit = netIncome - totalExpense;

  // ROI = (Net Profit / Total Expense) * 100
  const roi = totalExpense > 0 ? ((netProfit / totalExpense) * 100).toFixed(0) : 0;

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

      {/* Main KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <MetricCard title="Net Profit" value={`$${netProfit.toFixed(2)}`} icon={<DollarSign size={20} />} trend="Live" color={netProfit >= 0 ? "#34A853" : "#E8355A"} />
        <MetricCard title="ROI" value={`${roi}%`} icon={<TrendingUp size={20} />} trend="Margin" color="#FABB05" />
        <MetricCard title="Gross Income" value={`$${grossIncome.toFixed(2)}`} icon={<DollarSign size={20} />} trend={`-${stripeFees.toFixed(2)} Fees`} color="#34A853" />
        <MetricCard title="Total AI Expense" value={`$${totalExpense.toFixed(2)}`} icon={<Video size={20} />} trend={`${totalVideos} videos`} color="#E8355A" />
      </div>

      {/* Secondary Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem", opacity: 0.8 }}>
        <MetricCard title="Total Users" value={totalUsers.toLocaleString()} icon={<Users size={20} />} trend="Active" color="#ffffff" />
        <MetricCard title="Total Profile Views" value={totalViews.toLocaleString()} icon={<Eye size={20} />} trend="Traffic" color="#ffffff" />
      </div>

      {/* Main Chart Area */}
      <RevenueChart />
    </div>
  );
}
