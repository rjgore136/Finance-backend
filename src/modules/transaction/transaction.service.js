import ApiError from "../../config/ApiError.js";
import { isValidObjectId } from "../../utils/main.utils.js";
import Transaction from "./transaction.model.js";

export const createTransactionService = async (data, userId) => {
  const transaction = await Transaction.create({
    ...data,
    createdBy: userId,
  });

  return transaction;
};

export const getTransactionsService = async (filters) => {
  const p = parseInt(filters.p) || 1;
  const n = parseInt(filters.n) || 10;
  const skip = (p - 1) * n;

  const query = { isDeleted: false };

  if (filters.type) query.type = filters.type;
  if (filters.category) query.category = filters.category;

  if (filters.startDate || filters.endDate) {
    query.date = {};

    if (filters.startDate) query.date.$gte = new Date(filters.startDate);
    if (filters.endDate) query.endDate.$lte = new Date(filters.endDate);
  }

  const totalRecords = await Transaction.countDocuments(query);
  const transactions = await Transaction.find(query)
    .skip(skip)
    .limit(n)
    .populate({
      path: "createdBy",
      select: "name email",
    });

  return { transactions, totalRecords };
};

export const getTransactionByIdService = async (id) => {
  if (!isValidObjectId(id))
    throw new ApiError("Invalid or no transaction id provided!");

  const transaction = await Transaction.findById(id).populate({
    path: "createdBy",
    select: "name email",
  });

  if (!transaction) throw new ApiError("No transaction found!", 404);

  return transaction;
};

export const updateTransactionService = async (id, data) => {
  if (!isValidObjectId(id))
    throw new ApiError("Invalid or no transaction id provided!");

  const transaction = await Transaction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!transaction) throw new ApiError("Failed to udate transaction!", 400);

  return transaction;
};

export const deleteTransactionService = async (id) => {
  if (!isValidObjectId(id))
    throw new ApiError("Invalid or no transaction id provided!");

  const transaction = await Transaction.findById(id);
  if (!transaction) throw new ApiError("No transaction found!", 404);

  transaction.isDeleted = true;
  await transaction.save();
};
