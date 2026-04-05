import { success } from "zod";
import {
  createTransactionService,
  deleteTransactionService,
  getTransactionByIdService,
  getTransactionsService,
  updateTransactionService,
} from "./transaction.service.js";

export const createTransaction = async (req, res, next) => {
  console.log("req.body", req.body);
  const transaction = await createTransactionService(
    req.validated.body,
    req.user._id,
  );

  res.status(201).json({
    success: true,
    message: "Transaction created successfully.",
    transaction,
  });
};

export const getTransactions = async (req, res, next) => {
  try {
    const { totalRecords, transactions } = await getTransactionsService(
      req.validated.query,
    );

    console.log("totalRecords", totalRecords, "transactions", transactions);

    res.status(200).json({
      success: true,
      totalRecords,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await getTransactionByIdService(req.params.id);
    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await updateTransactionService(
      req.params.id,
      req.validated.body,
    );

    res.status(200).json({
      success: true,
      message: "Transaction updated successully.",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    await deleteTransactionService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
