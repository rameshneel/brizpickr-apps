import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HomeDashboard from '../features/home/components/HomeDashboard';

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <HomeDashboard />
      </MainLayout>
    </>
  );
};

export default HomePage;
