import {
  LucideProps,
  Plus,
  Trash,
  CircleCheck,
  CircleX,
  Pencil,
  File,
  LayoutDashboard,
  AlignJustify,
  Cloud,
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  ArrowLeft,
  ArrowRight,
  DownloadCloudIcon,
  MoreHorizontal,
  Calendar1Icon,
  Receipt,
  ReceiptText,
  ScrollText,
  type XIcon as LucideIcon,
} from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icons = {
  plus: (props: LucideProps) => <Plus {...props} />,
  trash: (props: LucideProps) => <Trash {...props} />,
  circlecheck: (props: LucideProps) => <CircleCheck {...props} />,
  circlexcheck: (props: LucideProps) => <CircleX {...props} />,
  pencil: (props: LucideProps) => <Pencil {...props} />,
  file: (props: LucideProps) => <File {...props} />,
  dashboard: (props: LucideProps) => <LayoutDashboard {...props} />,
  hambg: (props: LucideProps) => <AlignJustify {...props} />,
  cloud: (props: LucideProps) => <Cloud {...props} />,
  creditcard: (props: LucideProps) => <CreditCard {...props} />,
  support: (props: LucideProps) => <LifeBuoy {...props} />,
  logout: (props: LucideProps) => <LogOut {...props} />,
  github: (props: LucideProps) => <Github {...props} />,
  mail: (props: LucideProps) => <Mail {...props} />,
  message: (props: LucideProps) => <MessageSquare {...props} />,
  pluscircle: (props: LucideProps) => <PlusCircle {...props} />,
  settings: (props: LucideProps) => <Settings {...props} />,
  user: (props: LucideProps) => <User {...props} />,
  users: (props: LucideProps) => <Users {...props} />,
  userplus: (props: LucideProps) => <UserPlus {...props} />,
  arrowleft: (props: LucideProps) => <ArrowLeft {...props} />,
  arrowright: (props: LucideProps) => <ArrowRight {...props} />,
  downloadcloud: (props: LucideProps) => <DownloadCloudIcon {...props} />,
  morehoriz: (props: LucideProps) => <MoreHorizontal {...props} />,
  calendar: (props: LucideProps) => <Calendar1Icon {...props} />,
  receiptdollar: (props: LucideProps) => <Receipt {...props} />,
  receipttext: (props: LucideProps) => <ReceiptText {...props} />,
  report: (props: LucideProps) => <ScrollText {...props} />,

};