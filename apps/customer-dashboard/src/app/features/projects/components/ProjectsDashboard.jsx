import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Badge } from '@brizpickr/ui-kit';

// Dummy data fetcher (simulate API)
const fetchProjects = async () => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  return [
    {
      id: 1,
      type: 'E-Commerce',
      status: 'approved',
      title: 'Online Pharmacy App',
      description:
        'A Mobile-First App To Enable Medicine Ordering, Prescriptions, And Doorstep Delivery...',
      tags: ['Flutter', 'Node.Js', 'Firebase', 'Stripe API', 'UI/UX'],
      vendors: 2,
      vendorsTotal: 5,
      date: 'June 27, 2025',
      info: '2/5 Vendors Interested',
    },
    {
      id: 2,
      type: 'Digital Marketplace',
      status: 'rejected',
      title: 'Medication Delivery Platform',
      description:
        'A User-Friendly Mobile Application Designed For Seamless Ordering Of Medications...',
      tags: [
        'React',
        'Express.Js',
        'Firestore',
        'User Interface And Experience Design',
      ],
      vendors: 0,
      vendorsTotal: 0,
      date: 'May 2, 2025',
      info: 'Not Approved',
    },
    {
      id: 3,
      type: 'Dashboard',
      status: 'submitted',
      title: 'Medication Dashboard',
      description:
        'A Comprehensive Dashboard That Allows Users To Effortlessly Manage Their Medication Orders...',
      tags: ['Flutter', 'Nest.Js', 'Square API', 'User Interface Design'],
      vendors: 0,
      vendorsTotal: 0,
      date: 'June 27, 2025',
      info: 'Waiting For Team Review',
    },
  ];
};

const statusMap = {
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
};

export default function ProjectsDashboard() {
  const [tab, setTab] = useState('submitted');
  const [search, setSearch] = useState('');
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const filtered = projects.filter(
    p =>
      (tab === 'all' || p.status === tab) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Project’s</h1>
          <p className="text-gray-500">
            Overview Of Your Projects And Their Progress
          </p>
        </div>
        <Button>+ New Requirement</Button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={tab === 'submitted' ? 'default' : 'outline'}
          onClick={() => setTab('submitted')}
        >
          Submitted
        </Button>
        <Button
          variant={tab === 'draft' ? 'default' : 'outline'}
          onClick={() => setTab('draft')}
        >
          Draft
        </Button>
        <Input
          className="ml-auto w-64"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="outline"
                  className="text-primary-700 border-primary-300"
                >
                  {project.type}
                </Badge>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusMap[project.status]?.color}`}
                >
                  {statusMap[project.status]?.label}
                </span>
              </div>
              <h2 className="text-lg font-bold mb-1">{project.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>{project.info}</span>
                <span>{project.date}</span>
              </div>
              <Button className="mt-4 w-full">View Project</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
