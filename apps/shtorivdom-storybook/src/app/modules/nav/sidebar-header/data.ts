import { IMenuItem } from '@atlas/core';


export const data = {
  user: {
    title: 'spartan',
    email: 'hello@spartan.com',
    avatar: '/avatar.png',
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
