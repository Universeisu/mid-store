import api from "./api";
const VITE_FINANCIAL_API_URL = import.meta.env.VITE_FINANCIAL_API_URL;
// Get all financial records
const getAllFinancialRecords = async () => {
  return await api.get(`${VITE_FINANCIAL_API_URL}`);
};

// Get all financial records by userId
const getAllFinancialRecordsByUserID = async (userID) => {
  return await api.get(`${VITE_FINANCIAL_API_URL}/user/${userID}`);
};

// Get a financial record by id
const getFinancialRecordById = async (id) => {
  return await api.get(`${VITE_FINANCIAL_API_URL}/${id}`);
};

// Create a new record
const createFinancialRecord = async (record) => {
  return await api.post(`${VITE_FINANCIAL_API_URL}`, record);
};

// Update a record
const updateFinancialRecord = async (id, record) => {
  return await api.put(`${VITE_FINANCIAL_API_URL}/${id}`, record);
};

// Delete a record
const deleteFinancialRecord = async (id) => {
  return await api.delete(`${VITE_FINANCIAL_API_URL}/${id}`);
};

const FinancialService = {
  getAllFinancialRecords,
  getAllFinancialRecordsByUserID,
  getFinancialRecordById,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
};

export default FinancialService;
