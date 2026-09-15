import { IMenuItem } from '@atlas/core';


export const data = {
  user: {
    title: 'spartan',
    email: 'hello@spartan.com',
    avatar:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%230d223d'/%3E%3Ccircle cx='20' cy='15' r='7' fill='%23c9a84c'/%3E%3Cpath d='M6 38c2-8 8-12 14-12s12 4 14 12' fill='%23c9a84c'/%3E%3C/svg%3E",
  },
  navMain: [
    {
      title: 'Playground',
      link: '.',
      icon: 'lucideSquareTerminal',
      isActive: true,
      items: [
        {
          title: 'History',
          link: '.',
        },
        {
          title: 'Starred',
          link: '.',
        },
        {
          title: 'Settings',
          link: '.',
        },
      ],
    },
    {
      title: 'Models',
      link: '.',
      icon: 'lucideBot',
      items: [
        {
          title: 'Genesis',
          link: '.',
        },
        {
          title: 'Explorer',
          link: '.',
        },
        {
          title: 'Quantum',
          link: '.',
        },
      ],
    },
    {
      title: 'Documentation',
      link: '.',
      icon: 'lucideBookOpen',
      items: [
        {
          title: 'Introduction',
          link: '.',
        },
        {
          title: 'Get Started',
          link: '.',
        },
        {
          title: 'Tutorials',
          link: '.',
        },
        {
          title: 'Changelog',
          link: '.',
        },
      ],
    },
    {
      title: 'Settings',
      link: '.',
      icon: 'lucideSettings2',
      items: [
        {
          title: 'General',
          link: '.',
        },
        {
          title: 'Team',
          link: '.',
        },
        {
          title: 'Billing',
          link: '.',
        },
        {
          title: 'Limits',
          link: '.',
        },
      ],
    },
  ] satisfies IMenuItem[],
  navSecondary: [
    {
      title: 'Support',
      link: '.',
      icon: 'lucideLifeBuoy',
    },
    {
      title: 'Feedback',
      link: '.',
      icon: 'lucideSend',
    },
  ] satisfies IMenuItem[],
  projects: [
    {
      title: 'Design Engineering',
      link: '.',
      icon: 'lucideFrame',
    },
    {
      title: 'Sales & Marketing',
      link: '.',
      icon: 'lucideChartPie',
    },
    {
      title: 'Travel',
      link: '.',
      icon: 'lucideMap',
    },
  ] satisfies IMenuItem[],
};
