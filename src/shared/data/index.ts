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
  