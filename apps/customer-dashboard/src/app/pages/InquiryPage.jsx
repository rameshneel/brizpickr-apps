import React from 'react';
import MainLayout from '../layouts/MainLayout';
import InquiryDashboard from '../features/inquiry/components/InquiryDashboard';

const InquiryPage = () => {
  return (
    <MainLayout>
      <InquiryDashboard />
    </MainLayout>
  );
};

export default InquiryPage;
