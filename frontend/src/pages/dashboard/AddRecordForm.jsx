import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFinancialRecords } from "../../contexts/financial.context";
import { useUser } from "@clerk/clerk-react";

const AddRecordForm = () => {
  const { addRecord } = useFinancialRecords();
  const { user } = useUser(); // Fetch current user from Clerk
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    imageUrl: "",
    
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({ ...prevData, userID: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRecord = async () => {
    try {
      await addRecord(formData);
      // Display success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Record added successfully!",
        confirmButtonText: "OK",
      });
      setFormData({
        id: user ? user.id : "", // Preserve userId if present
        name: "",
        type: "",
        price: "",
        imageUrl: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error adding record:", error);
      // Display error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while adding the record. Please try again.",
        confirmButtonText: "OK",
      });
      setError("An error occurred while adding the record. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Device Record
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* <div className="mb-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="mt-1 block w-full p-3 border border-yellow-400 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter User ID"
          required
        />
      </div> */}

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-3 border border-pink-400 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter Name"
          required
        />
      </div>

     

      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full p-3 border border-orange-400 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter price"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Type
        </label>
        <select
          id="Type"
          name="Type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full p-3 border border-indigo-400 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="">Select Category</option>
          <option value="อาหาร">อาหาร</option>
          <option value="ขนมทานเล่น">ขนมทานเล่น</option>
          <option value="น้ำดื่ม">เครื่องดื่ม</option>
          <option value="ของใช้">ของใช้</option>
          <option value="เสื้อผ้า">เสื้อผ้า</option>
          <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
          <option value="สุขภาพ">สุขภาพ</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="mt-1 block w-full p-3 border border-red-400 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        >
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="creditCard">Credit Card</option>
          <option value="debitCard">Debit Card</option>
          <option value="onlineBanking">Online Banking</option>
        </select>
      </div>

      <button
        type="button"
        onClick={handleAddRecord}
        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Record
      </button>
    </div>
  );
};

export default AddRecordForm;
