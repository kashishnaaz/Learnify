"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";   
import { LogOut } from "lucide-react";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {
                isTeacherPage || isCoursePage ? (
                    <Link href="/">
                        <Button size="sm" variant="outline" className="border-sky-700 bg-sky-100 text-sky-800 hover:bg-sky-700 hover:text-white transition-all duration-300 hover:shadow-sm hover:scale-105 active:scale-95">
                           <LogOut className="h-4 w-4 mr-2"/>
                           Exit
                        </Button>
                    </Link>
                ):(
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="outline" className="border-sky-700 bg-sky-100 text-sky-800 hover:bg-sky-700 hover:text-white transition-all duration-300 hover:shadow-sm hover:scale-105 active:scale-95">
                            Teacher mode
                        </Button>
                    </Link>
                )
            }
            <UserButton />
        </div>
        </>
    )
}