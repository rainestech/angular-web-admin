export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Menu Manager',
    url: '/menu',
    icon: 'icon-menu'
  },
  {
    name: 'Drafts',
    url: '/drafts',
    icon: 'icon-docs'
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-book-open',
    children: [
      {
        name: 'Front Pages',
        url: '/pages/front',
        icon: 'icon-share-alt'
      },
      {
        name: 'Blog',
        url: '/pages/blog',
        icon: 'icon-note'
      }
    ]
  },
  {
    name: 'Mailbox',
    url: '/mails',
    icon: 'icon-envelope',
    children: [
      {
        name: 'Emails',
        url: '/mails',
        icon: 'icon-envelope-open'
      },
      {
        name: 'Contact Messages',
        url: '/mails/contacts',
        icon: 'icon-envelope-letter'
      },
      {
        name: 'Service Request',
        url: '/mails/service-requests',
        icon: 'icon-layers'
      }
    ]
  },
  {
    name: 'Invoice',
    url: 'invoice',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Paid',
        url: '/invoice/paid',
        icon: 'icon-cursor'
      },
      {
        name: 'Unpaid',
        url: '/invoice/unpaid',
        icon: 'icon-cursor'
      },
      {
        name: 'Overdue',
        url: '/invoice/overdue',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'icon-people'
  }

];
