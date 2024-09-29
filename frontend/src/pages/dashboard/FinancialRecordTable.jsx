import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useFinancialRecords } from '../../contexts/financial.context';

const FinancialRecordTable = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords(); // Fetch context functions
  const [editRecord, setEditRecord] = useState(null); // State to store the record being edited

  // Function to handle edit action
  const handleEdit = (record) => {
    // Ensure the date is in the correct format for the date input
    const formattedDate = record.date.slice(0, 10); // Assuming date is in ISO format YYYY-MM-DDTHH:MM:SSZ
    setEditRecord({
      ...record,
      date: formattedDate
    });
  };

  // Function to handle delete action with SweetAlert2 confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(id);
        Swal.fire(
          'Deleted!',
          'The record has been deleted.',
          'success'
        );
      }
    });
  };

  // Function to handle save edit with SweetAlert2 success message
  const handleSaveEdit = () => {
    if (editRecord) {
      updateRecord(editRecord.id, editRecord); // Update record in context
      Swal.fire(
        'Updated!',
        'The record has been updated.',
        'success'
      );
      setEditRecord(null); // Clear the edit form
    }
  };

  // Function to handle cancel edit
  const handleCancelEdit = () => {
    setEditRecord(null); // Reset edit state
  };

  return (
    <div className="overflow-x-auto mt-4 pb-6">
      <table className="min-w-full table-auto border-collapse bg-blue-50 shadow-md rounded-lg mb-4">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="px-4 py-2 border-b-2 text-left">id</th>
            <th className="px-4 py-2 border-b-2 text-left">Name</th>
            <th className="px-4 py-2 border-b-2 text-left">Type</th>
            <th className="px-4 py-2 border-b-2 text-left">Price</th>
            <th className="px-4 py-2 border-b-2 text-left">imagesUrl</th>
           
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.id || index} className="bg-white hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{record.userID}</td>
              <td className="px-4 py-2 border-b">{record.description}</td>
              <td className="px-4 py-2 border-b">{record.date}</td>
              <td className="px-4 py-2 border-b">{record.amount}</td>
              <td className="px-4 py-2 border-b">{record.category}</td>
              <td className="px-4 py-2 border-b">{record.paymentMethod}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show edit form if a record is being edited */}
      {editRecord && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Edit Record</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit();
          }} className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={editRecord.description}
                onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })}
                placeholder="Description"
                className="border border-blue-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={editRecord.date}
                onChange={(e) => setEditRecord({ ...editRecord, date: e.target.value })}
                className="border border-green-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={editRecord.amount}
                onChange={(e) => setEditRecord({ ...editRecord, amount: e.target.value })}
                placeholder="Amount"
                className="border border-purple-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50"
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={editRecord.category}
                onChange={(e) => setEditRecord({ ...editRecord, category: e.target.value })}
                className="border border-teal-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-teal-50"
              >
                <option value="">Select Category</option>
                <option value="อาหาร">อาหาร</option>
                <option value="ขนมทานเล่น">ขนมทานเล่น</option>
                <option value="น้ำดื่ม">น้ำดื่ม</option>
                <option value="ของใช้">ของใช้</option>
                <option value="เสื้อผ้า">เสื้อผ้า</option>
                <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                <option value="สุขภาพ">สุขภาพ</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">Payment Method</label>
              <select
                value={editRecord.paymentMethod}
                onChange={(e) => setEditRecord({ ...editRecord, paymentMethod: e.target.value })}
                className="border border-indigo-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
                <option value="onlineBanking">Online Banking</option>
              </select>
            </div>

            <div className="flex items-center mt-4 w-full">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
              >
                Save
              </button>
            </div>
            <div className="flex items-center mt-4 w-full">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FinancialRecordTable;
