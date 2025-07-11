import React from 'react';
import MainLayout from '../layouts/MainLayout';
import InboxDashboard from '../features/inbox/components/InboxDashboard';

const InboxPage = () => {
  return (
    <div>
      <MainLayout>
        <InboxDashboard />
      </MainLayout>
    </div>
  );
};

export default InboxPage;
