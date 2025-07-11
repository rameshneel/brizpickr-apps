import React from 'react';
import MainLayout from '../layouts/MainLayout';
import CreateProject from '../features/createProject/components/CreateProject';

const CreateProjectPage = () => {
  return (
    <>
      <MainLayout>
        <CreateProject />
      </MainLayout>
    </>
  );
};

export default CreateProjectPage;
