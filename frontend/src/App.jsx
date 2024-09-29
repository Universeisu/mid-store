import React from 'react';
import AddRecordForm from './pages/Dashboard/AddRecordForm';
import FinancialRecordTable from './pages/Dashboard/FinancialRecordTable';
import { FinancialRecordProvider } from './contexts/financial.context';

const App = () => {
  return (
    <FinancialRecordProvider>
      <div className="p-4">
        <AddRecordForm />
        <FinancialRecordTable />
      </div>
    </FinancialRecordProvider>
  );
};

export default App;

