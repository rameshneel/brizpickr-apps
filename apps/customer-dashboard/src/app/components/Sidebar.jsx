import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  FolderKanban,
  MessageCircle,
  HelpCircle,
  Info,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, to: '/dashboard' },
  { label: 'Projects', icon: FolderKanban, to: '/dashboard' },
  { label: 'Message', icon: MessageCircle, to: '/dashboard/messages' },
  { label: 'Help Center', icon: HelpCircle, to: '/dashboard/help' },
  { label: 'Inquiry', icon: Info, to: '/dashboard/inquiry' },
  { label: 'Setting', icon: Settings, to: '/dashboard/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      <div className="h-20 flex items-center justify-center border-b">
        <img src="/logo192.png" alt="BizPickr" className="h-10" />
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2 rounded-lg font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
                    isActive || location.pathname === to
                      ? 'bg-primary-100 text-primary-700'
                      : ''
                  }`
                }
                end
              >
                <Icon size={20} className="shrink-0" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
