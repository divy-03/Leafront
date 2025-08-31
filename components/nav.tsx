"use client"

import { getCurrentUser } from "@/utils/api";
import ThemSwitch from "./theme-switch";
import NextImage from "next/image";

import Link from "next/link"
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span aria-hidden className="text-lg">
            🍃
          </span>
          <span className="font-semibold tracking-tight">Leaf</span>
          <span className="sr-only">Leaf - Leave Management</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/">
            Home
          </Link>
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/employee">
            Employee Portal
          </Link>
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/admin">
            Admin Console
          </Link>

          <HeaderAuth />

          <ThemSwitch />
        </nav>
      </div>
    </header>
  )
}

type User = {
  email: string;
  first_name: string;
  last_name: string;
  department_id: number;
  user_id: number;
  join_date: string;
  role: string;
};



const HeaderAuth = () => {
  // const [user, setUser] = useState({
  //   email: null,
  //   first_name: null,
  //   last_name: null,
  // });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((data: User) => {
        setUser(data);
      })
      .catch((err) => console.error("Error fetching balances:", err));
  }, []);

  return (
    <div className="flex items-center gap-4 mx-2">
      {user ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <NextImage
                src={
                  `https://ui-avatars.com/api/?name=${user.first_name ?? user.email![0]
                  }`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                width={32}
                height={32}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full px-0 py-2">
            <Link href={"/profile"} className="p-2 font-bold mb-3">
              Profile
            </Link>
            <Separator />

            <button
              className="flex w-full cursor-pointer hover:bg-muted items-center gap-1 p-1"
              type="submit"
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/api/auth/signin" className="btn btn-primary">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      )}
    </div>
  );
};
