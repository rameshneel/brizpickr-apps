import React from 'react';
import { useSelector } from 'react-redux';
import { Bell } from 'lucide-react';

export default function Header() {
  const user = useSelector(state => state.auth.user);
  return (
    <header className="flex items-center justify-end h-20 px-8 bg-white border-b gap-6">
      <button className="relative p-2 rounded-full hover:bg-gray-100">
        <Bell size={22} className="text-gray-500" />
        {/* Notification dot */}
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-700">
          {user?.name || 'User'}
        </span>
        <img
          src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
          alt="avatar"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
}
