import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MessageDeshboard from '../features/massage/components/MessageDeshboard';

const MessagePage = () => {
  return (
    <>
      <MainLayout>
        <MessageDeshboard />
      </MainLayout>
    </>
  );
};

export default MessagePage;
