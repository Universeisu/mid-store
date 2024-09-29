// import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial.context";
import AddRecordForm from "./AddRecordForm";
import FinancialRecordTable from "./FinancialRecordTable";

const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  // คำนวณยอดรวมรายเดือน
  const totalMonthly = records.reduce((total, record) => {
    const recordDate = new Date(record.date);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear) {
      return total + parseFloat(record.amount);
    }

    return total;
  }, 0).toFixed(2);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="text-center text-3xl md:text-4xl md:leading-snug font-bold my-2">
        Welcome {user?.firstName}! Here are your finances:
      </div>
      <AddRecordForm />
      <div className="text-center text-xl my-4">
        Total Monthly: {totalMonthly}฿
      </div>
      <FinancialRecordTable records={records} />
    </div>
  );
};

export default Dashboard;
