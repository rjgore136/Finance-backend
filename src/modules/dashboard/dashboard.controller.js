import {
  getDashboardSummaryService,
  getRecentTransactionsService,
} from "./dashboard.service.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await getDashboardSummaryService();

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentTransactions = async (req, res, next) => {
  try {
    const last5Transactions = await getRecentTransactionsService();

    res.status(200).json({
      success: true,
      last5Transactions,
    });
  } catch (error) {
    next(error);
  }
};
