import { signal } from '@angular/core';
import { ISignalMenuItem } from '../../../common/menu';

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
      active: signal(true),
      children: signal([
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
      ]),
    },
    {
      title: 'Models',
      link: '.',
      icon: 'lucideBot',
      children: signal([
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
      ]),
    },
    {
      title: 'Documentation',
      link: '.',
      icon: 'lucideBookOpen',
      children: signal([
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
      ]),
    },
    {
      title: 'Settings',
      link: '.',
      icon: 'lucideSettings2',
      children: signal([
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
      ]),
    },
  ] satisfies ISignalMenuItem[],
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
  ] satisfies ISignalMenuItem[],
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
  ] satisfies ISignalMenuItem[],
};
