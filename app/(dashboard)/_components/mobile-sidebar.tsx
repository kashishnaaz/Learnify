import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { SheetTitle } from "@/components/ui/sheet";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";


export const MobileSidebar = () => {
    return (
        <Sheet>
          <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-white">
            {/* Hidden title (UI me nahi dikhega) */}
            <SheetTitle className="sr-only">
               Sidebar
            </SheetTitle>
            <Sidebar />
          </SheetContent  >
        </Sheet>
    );
}