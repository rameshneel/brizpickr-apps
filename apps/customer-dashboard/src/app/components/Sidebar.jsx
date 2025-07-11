import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  FolderKanban,
  MessageCircle,
  HelpCircle,
  Info,
  Settings,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, to: '/home' },
  {
    label: 'Projects',
    icon: FolderKanban,
    to: '/projects',
    children: [
      {
        label: 'CreateProject',
        to: '/projects/createProject',
        children: [
          {
            label: 'CreateProjectStep1',
            to: '/projects/createProject/step1',
            children: [
              {
                label: 'CreateProjectStep1Details',
                to: '/projects/createProject/step1/details',
              },
            ],
          },
        ],
      },
      { label: 'EditProject', to: '/projects/editProject' },
    ],
  },
  {
    label: 'Message',
    icon: MessageCircle,
    to: '/message',
    children: [
      { label: 'Inbox', to: '/message/inbox' },
      { label: 'Send', to: '/message/send' },
    ],
  },
  { label: 'Help Center', icon: HelpCircle, to: '/help' },
  { label: 'Inquiry', icon: Info, to: '/inquiry' },
  { label: 'Setting', icon: Settings, to: '/setting' },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (to, label, hasChildren) => {
    console.log(`Clicked: ${label} (${to})`);
    if (hasChildren) {
      setOpenMenus(prev => ({
        ...prev,
        [to]: !prev[to],
      }));
    }
    navigate(to);
  };

  const renderNavItems = (items, level = 0, parentPath = []) => {
    return (
      <ul className={`${level > 0 ? 'pl-6 mt-1 space-y-1' : 'space-y-1'}`}>
        {items.map(item => {
          const { label, icon: Icon, to, children } = item;
          const key = [...parentPath, label].join('/');
          const isOpen = openMenus[key];
          const hasChildren = Boolean(children);

          const toggle = () => {
            if (hasChildren) {
              setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
            } else {
              navigate(to);
            }
          };

          return (
            <li key={key}>
              <div
                className={`flex items-center justify-between px-${
                  level === 0 ? 6 : 4
                } py-2 rounded-lg font-medium transition-colors cursor-pointer hover:bg-primary-50 ${
                  isOpen ? 'bg-primary-100 text-primary-700' : 'text-gray-700'
                }`}
              >
                <div
                  onClick={toggle}
                  className="flex items-center gap-3 flex-1"
                >
                  {Icon && <Icon size={20} className="shrink-0" />}
                  <span>{label}</span>
                </div>
                {hasChildren && (
                  <div>
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>
                )}
              </div>

              {hasChildren &&
                isOpen &&
                renderNavItems(children, level + 1, [...parentPath, label])}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      <div className="h-20 flex items-center justify-center border-b">
        <img src="/logo192.png" alt="BizPickr" className="h-10" />
      </div>
      <nav className="flex-1 py-6">{renderNavItems(navItems)}</nav>
    </aside>
  );
}
