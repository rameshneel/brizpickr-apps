import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ProjectsDashboard from '../features/projects/components/ProjectsDashboard.jsx';

export default function DashboardPage() {
  return (
    <MainLayout>
      <ProjectsDashboard />
    </MainLayout>
  );
}
