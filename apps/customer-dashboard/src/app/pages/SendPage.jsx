import React from 'react';
import MainLayout from '../layouts/MainLayout';
import SendDashboard from '../features/send/components/SendDashboard';

const SendPage = () => {
  return (
    <div>
      <MainLayout>
        <SendDashboard />
      </MainLayout>
    </div>
  );
};

export default SendPage;
