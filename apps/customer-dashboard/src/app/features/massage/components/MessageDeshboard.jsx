import React from 'react';

const MessageDeshboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Chat List */}
      <div className="w-1/3 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              A
            </div>
            <div>
              <p className="font-medium">Anjali Sharma</p>
              <p className="text-sm text-gray-500">Hey, how are you?</p>
            </div>
          </li>
          <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
              R
            </div>
            <div>
              <p className="font-medium">Rahul Verma</p>
              <p className="text-sm text-gray-500">Meeting at 5?</p>
            </div>
          </li>
          {/* Add more chat previews as needed */}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold">Anjali Sharma</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded shadow max-w-xs">
              `` ``
              <p>Hey there! 👋</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white px-4 py-2 rounded shadow max-w-xs">
              <p>Hi! All good here.</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded shadow max-w-xs">
              <p>Want to catch up later today?</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 border-t border-gray-200 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDeshboard;
