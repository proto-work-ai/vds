import { IMenuItem } from "../../../common/menu";

export const data = {
  user: {
    title: 'spartan',
    email: 'hello@spartan.com',
    avatar: '/assets/avatar.png',
  },
  navMain: [
    {
      title: 'Playground',
      url: '.',
      icon: 'lucideSquareTerminal',
      isActive: true,
      items: [
        {
          title: 'History',
          url: '.',
        },
        {
          title: 'Starred',
          url: '.',
        },
        {
          title: 'Settings',
          url: '.',
        },
      ],
    },
    {
      title: 'Models',
      url: '.',
      icon: 'lucideBot',
      items: [
        {
          title: 'Genesis',
          url: '.',
        },
        {
          title: 'Explorer',
          url: '.',
        },
        {
          title: 'Quantum',
          url: '.',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '.',
      icon: 'lucideBookOpen',
      items: [
        {
          title: 'Introduction',
          url: '.',
        },
        {
          title: 'Get Started',
          url: '.',
        },
        {
          title: 'Tutorials',
          url: '.',
        },
        {
          title: 'Changelog',
          url: '.',
        },
      ],
    },
    {
      title: 'Settings',
      url: '.',
      icon: 'lucideSettings2',
      items: [
        {
          title: 'General',
          url: '.',
        },
        {
          title: 'Team',
          url: '.',
        },
        {
          title: 'Billing',
          url: '.',
        },
        {
          title: 'Limits',
          url: '.',
        },
      ],
    },
  ] satisfies IMenuItem[],
  navSecondary: [
    {
      title: 'Support',
      url: '.',
      icon: 'lucideLifeBuoy',
    },
    {
      title: 'Feedback',
      url: '.',
      icon: 'lucideSend',
    },
  ] satisfies IMenuItem[],
  projects: [
    {
      title: 'Design Engineering',
      url: '.',
      icon: 'lucideFrame',
    },
    {
      title: 'Sales & Marketing',
      url: '.',
      icon: 'lucideChartPie',
    },
    {
      title: 'Travel',
      url: '.',
      icon: 'lucideMap',
    },
  ] satisfies IMenuItem[],
};
