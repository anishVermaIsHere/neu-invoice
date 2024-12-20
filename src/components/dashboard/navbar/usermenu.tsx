import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { handleLogout } from "@/app/actions";
import useAuthStore from "@/store/auth.store";

export function UserMenu() {
  const { user } = useAuthStore(s=>s);
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full" asChild>
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.image || `/user.jpg`} alt="profile pic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-gray-400 text-sm">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icons.user />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <Icons.logout />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
