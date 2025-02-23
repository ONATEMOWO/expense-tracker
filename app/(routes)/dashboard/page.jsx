"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "../dashboard/_components/CardInfo";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { db } from "@/utils/dbconfig";
import BarChartDashboard from "../dashboard/_components/BarChart";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetid))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetid))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.firstName}👋</h2>
      <p className="text-gray-500">
        Here's what's happenning with your money, Let's manage your expenses.
      </p>

      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="md:col-span-2">
            <BarChartDashboard budgetList={budgetList} />
          </div>
          <h2 className="font-bold text-lg">Latest Expenses</h2>
          <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold-text-lg">Latests Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
