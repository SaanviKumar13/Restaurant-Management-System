import { MetaFunction } from "@remix-run/react";
import { Chart } from "react-google-charts";

export const meta: MetaFunction = () => {
  return [
    { title: "Diner | Insights" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Insights() {
  const salesTrendsData = [
    ["Month", "Sales"],
    ["Jan", 3000],
    ["Feb", 4000],
    ["Mar", 3500],
    ["Apr", 4000],
    ["May", 4500],
    ["Jun", 4000],
  ];

  const topSellingItemsData = [
    ["Item", "Quantity Sold"],
    ["Pizza", 40],
    ["Burger", 30],
    ["Pasta", 20],
    ["Salad", 10],
  ];

  const customerAnalysisData = [
    ["Gender", "Percentage"],
    ["Male", 60],
    ["Female", 40],
  ];

  const orderAnalysisData = [
    ["Day", "Orders"],
    ["Mon", 350],
    ["Tue", 400],
    ["Wed", 450],
    ["Thu", 425],
    ["Fri", 500],
    ["Sat", 550],
    ["Sun", 525],
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
    <div className="font-sans bg-[#1d212c] w-screen p-10">
      <h1 className="text-4xl mb-6 text-purple-200 font-heading w-[60vw] text-center font-bold">
        Insights
      </h1>

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
    </div>
  );
}
