import Transaction from "../transaction/transaction.model.js";

export const getDashboardSummaryService = async () => {
  const result = await Transaction.aggregate([
    { $match: { isDeleted: false } },

    {
      $facet: {
        incomeSummary: [
          {
            $group: {
              _id: "$type",
              total: { $sum: "$amount" },
            },
          },
        ],

        categoryWise: [
          {
            $group: {
              _id: "$category",
              total: { $sum: "$amount" },
            },
          },
        ],

        monthlyTrends: [
          {
            $group: {
              _id: {
                year: { $year: "$date" },
                month: { $month: "$date" },
              },
              total: { $sum: "$amount" },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ],
      },
    },
  ]);

  console.log("result", result);

  const data = result[0];

  console.log("data", data);

  let income = 0;
  let expense = 0;

  data.incomeSummary.forEach((item) => {
    if (item._id === "income") income += item.total;
    if (item._id === "expense") expense += item.total;
  });

  return {
    incomeSummary: {
      totalIncome: income,
      totalExpenses: expense,
      netBalance: income - expense,
    },
    categoryWise: data.categoryWise,
    monthlyTrends: data.monthlyTrends,
  };
};

export const getRecentTransactionsService = async () => {
  return await Transaction.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate({ path: "createdBy", select: "name email" });
};
