import path from 'path';
import { lazy } from 'react';

// Lazy load components for better performance
const LoginPage = lazy(() => import('../pages/LoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const CreateProjectPage = lazy(() => import('../pages/CreateProjectPage'));
const EditProjectPage = lazy(() => import('../pages/EditProjectPage'));
const SettingPage = lazy(() => import('../pages/SettingPage'));
const MessagePage = lazy(() => import('../pages/MessagePage'));
const InquiryPage = lazy(() => import('../pages/InquiryPage'));
const HelpPage = lazy(() => import('../pages/HelpPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const InboxPage = lazy(() => import('../pages/InboxPage'));
const SendPage = lazy(() => import('../pages/SendPage'));

// Route configurations
export const publicRoutes = [
  {
    path: '/login',
    element: LoginPage,
    title: 'Login',
    description: 'User authentication page',
  },
];

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: DashboardPage,
    title: 'Dashboard',
    description: 'Main dashboard page',
    icon: 'Home',
  },
  // Add more protected routes here
  {
    path: '/setting',
    element: SettingPage,
    title: 'Setting',
    description: 'Main Setting page',
    icon: 'floder',
  },
  {
    path: '/message',
    element: MessagePage,
    title: 'Message',
    description: 'Main Message page',
    icon: 'floder',
  },
  // child of massage
  {
    path: '/message/inbox',
    element: InboxPage,
    title: 'Inbox',
    description: 'Mian inbox page',
    icon: 'floder',
  },
  {
    path: '/message/send',
    element: SendPage,
  },
  {
    path: '/inquiry',
    element: InquiryPage,
    title: 'Inquiry',
    description: 'Main Inquiry page',
    icon: 'floder',
  },
  {
    path: '/help',
    element: HelpPage,
    title: 'Help',
    description: 'Main Help page',
    icon: 'floder',
  },
  {
    path: '/home',
    element: HomePage,
    title: 'Home',
    description: 'Main Home page',
    icon: 'floder',
  },

  {
    path: '/projects',
    element: DashboardPage,
    title: 'Projects',
    icon: 'Folder',
  },
  // project route ka subchild
  {
    path: '/projects/createProject',
    element: CreateProjectPage,
    title: 'Create Project',
    description: 'Page to create new project',
    icon: 'Folder',
  },
  {
    path: '/projects/editProject',
    element: EditProjectPage,
    title: 'Edit Project',
    description: 'Page to edit existing project',
    icon: 'Folder',
  },

  // {
  //   path: '/profile',
  //   element: lazy(() => import('../pages/ProfilePage')),
  //   title: 'Profile',
  //   description: 'User profile settings',
  //   icon: 'User'
  // }
];

// Navigation menu items (for sidebar)
export const navigationItems = protectedRoutes.map(route => ({
  path: route.path,
  title: route.title,
  icon: route.icon,
  description: route.description,
}));

// Route guards configuration
export const routeGuards = {
  requireAuth: true,
  redirectTo: '/login',
  publicPaths: ['/login', '/register', '/forgot-password'],
};
