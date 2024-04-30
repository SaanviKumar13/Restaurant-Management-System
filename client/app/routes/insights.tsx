import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Insights() {
  const salesTrendsData = [
    ["Month", "Sales"],
    ["Jan", 1000],
    ["Feb", 1500],
    ["Mar", 1200],
    ["Apr", 1800],
    ["May", 2000],
    ["Jun", 1600],
  ];

  const topSellingItemsData = [
    ["Item", "Quantity Sold"],
    ["Pizza", 200],
    ["Burger", 150],
    ["Pasta", 120],
    ["Salad", 100],
  ];

  const customerAnalysisData = [
    ["Gender", "Percentage"],
    ["Male", 60],
    ["Female", 35],
    ["Others", 5],
  ];

  const orderAnalysisData = [
    ["Day", "Orders"],
    ["Mon", 50],
    ["Tue", 60],
    ["Wed", 70],
    ["Thu", 65],
    ["Fri", 80],
    ["Sat", 90],
    ["Sun", 85],
  ];

  const revenueAnalysisData = [
    ["Channel", "Revenue"],
    ["Dine-in", 3000],
    ["Delivery", 4000],
    ["Takeaway", 3500],
  ];

  const feedbackAndReviewsData = [
    ["Rating", "Count"],
    ["Excellent", 40],
    ["Good", 30],
    ["Average", 20],
    ["Poor", 10],
  ];

  return (
    <div className="font-sans bg-[#1d212c] w-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Insights</h1>

      {/* Sales Trends */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Sales Trends</h2>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={salesTrendsData}
          options={{
            title: "Sales Trends",
            hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      </div>

      {/* Top Selling Items */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Top Selling Items</h2>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={topSellingItemsData}
          options={{
            title: "Top Selling Items",
            hAxis: { title: "Item", titleTextStyle: { color: "#333" } },
            vAxis: { title: "Quantity Sold", minValue: 0 },
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      </div>

      {/* Customer Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Customer Analysis</h2>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={customerAnalysisData}
          options={{
            title: "Customer Demographics",
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      </div>

      {/* Order Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Order Analysis</h2>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={orderAnalysisData}
          options={{
            title: "Orders per Day",
            hAxis: { title: "Day", titleTextStyle: { color: "#333" } },
            vAxis: { title: "Orders", minValue: 0 },
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      </div>

      {/* Revenue Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Revenue Analysis</h2>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={revenueAnalysisData}
          options={{
            title: "Revenue by Channel",
            hAxis: { title: "Channel", titleTextStyle: { color: "#333" } },
            vAxis: { title: "Revenue", minValue: 0 },
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      </div>

      {/* Feedback and Reviews */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Feedback and Reviews</h2>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={feedbackAndReviewsData}
          options={{
            title: "Customer Feedback",
            chartArea: { width: "80%", height: "70%" },
          }}
        />
      </div>
    </div>
  );
}
