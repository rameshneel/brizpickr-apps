import React from 'react';

const HelpDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Help Center</h1>
          <p className="text-gray-600 mt-2">How can we help you today?</p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Help Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Account Settings',
              icon: '👤',
              description: 'Manage your account preferences and settings.',
            },
            {
              title: 'Billing & Payments',
              icon: '💳',
              description:
                'Get help with invoices, billing cycles, and methods.',
            },
            {
              title: 'Privacy & Security',
              icon: '🔒',
              description: 'Learn how we keep your data safe.',
            },
            {
              title: 'Using the Dashboard',
              icon: '📊',
              description: 'Understand how to navigate and use features.',
            },
            {
              title: 'Troubleshooting',
              icon: '🛠️',
              description: 'Fix common issues and problems.',
            },
            {
              title: 'Contact Support',
              icon: '📞',
              description: 'Reach out to our support team for direct help.',
            },
          ].map((topic, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-200 cursor-pointer"
            >
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ / Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-4">Still need help?</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDashboard;
