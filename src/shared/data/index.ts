import { Icons } from "@/components/ui/icons"
import { LucideProps } from "lucide-react";

export type SidebarLinksType = {
    id: string;
    label: string;
    link: string;
    basePath: string;
    icon: (props: LucideProps) => JSX.Element;
}

export const dashboardConsts = {
    sidebarLinks: [
        {
            id:`nS6bapRc-PP85up-xFojv`,
            label: 'Dashboard',
            link:'/dashboard',
            basePath: '/dashboard',
            icon: Icons.dashboard
        },
        {
            id:`MFpMNW3WxRuJfNKNACsUS`,
            label: 'Invoices',
            link:'/dashboard/invoices',
            basePath: '/invoices',
            icon: Icons.receipttext
        },
        {
            id:`fESkBROFGeX-uVn_zBXXK`,
            label: 'Customers',
            link:'/dashboard/customers',
            basePath: '/customers',
            icon: Icons.users
        },
        {
            id:`DOb6Ew8nFIsSVrX-AXEqk`,
            label: 'Reports',
            link:'/dashboard/reports',
            basePath: '/reports',
            icon: Icons.report
        }
    ],
    cards: [
        {
            id: `QeZQanSDLcE9cUL6HQqGB`,
            title: '',
            link: ''
        },
        {
            id: `piNU2KRIVHDOtGvunb81x`,
            title: '',
            link: ''
        },
        {
            id: `Yu1eblJVGSwaPK5z-5F21`,
            title: '',
            link: ''
        },
        {
            id: `sSkKjLOslK7S4zEeNiaHo`,
            title: '',
            link: ''
        }
    ]
}


export const invoices = [
    {
      id: 'INV001',
      paymentStatus: 'Pending',
      totalAmount: '$578.87',
      paymentMethod: 'UPI',
      customerName: 'Justin Fisher',
      date: '2024-02-18'
    },
    {
      id: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$453.92',
      paymentMethod: 'PayPal',
      customerName: 'Karen Sparks',
      date: '2024-02-03'
    },
    {
      id: 'INV003',
      paymentStatus: 'Pending',
      totalAmount: '$296.17',
      paymentMethod: 'PayPal',
      customerName: 'Alexandra Owens',
      date: '2024-11-23'
    },
    {
      id: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$553.01',
      paymentMethod: 'PayPal',
      customerName: 'Daniel Long',
      date: '2024-07-19'
    },
    {
      id: 'INV005',
      paymentStatus: 'Unpaid',
      totalAmount: '$386.88',
      paymentMethod: 'Credit Card',
      customerName: 'Richard Sanchez',
      date: '2024-09-28'
    },
    {
      id: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$584.04',
      paymentMethod: 'PayPal',
      customerName: 'Jacob Henderson',
      date: '2024-07-10'
    },
    {
      id: 'INV007',
      paymentStatus: 'Paid',
      totalAmount: '$498.73',
      paymentMethod: 'Credit Card',
      customerName: 'Amanda Bowers',
      date: '2024-01-04'
    },
    {
      id: 'INV008',
      paymentStatus: 'Unpaid',
      totalAmount: '$465.94',
      paymentMethod: 'PayPal',
      customerName: 'Daniel Caldwell',
      date: '2024-08-08'
    },
    {
      id: 'INV009',
      paymentStatus: 'Pending',
      totalAmount: '$541.65',
      paymentMethod: 'UPI',
      customerName: 'Hannah Hamilton',
      date: '2024-09-09'
    },
    {
      id: 'INV010',
      paymentStatus: 'Pending',
      totalAmount: '$408.36',
      paymentMethod: 'UPI',
      customerName: 'Joshua Brennan',
      date: '2024-11-18'
    }
  ]
  
  export const currencies = [
    {
      id: 'inr',
      label: "Indian Rupee - INR",
      value: "INR",
    },
    {
      id: 'usd',
      label: "US Dollar - USD",
      value: "USD",
    },
    {
      id: 'eur',
      label: "Euro - EUR",
      value: "EUR",
    },
    {
      id: 'gbp',
      label: "British Pound - GBP",
      value: "GBP",
    },
    {
      id: 'jpy',
      label: "Japanese Yen - JPY",
      value: "JPY",
    },
  ];
  