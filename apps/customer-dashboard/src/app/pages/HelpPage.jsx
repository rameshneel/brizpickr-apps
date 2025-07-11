import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HelpDashboard from '../features/help/components/HelpDashboard';

const HelpPage = () => {
  return (
    <>
      <MainLayout>
        <HelpDashboard />
      </MainLayout>
    </>
  );
};

export default HelpPage;
