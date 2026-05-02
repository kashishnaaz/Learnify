"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import {IconType} from "react-icons";

interface CategoryItemProps {
    label : string;
    value?: string;
    Icon?: IconType;
}

export const CategoryItem = ({
    label,
    value,
    Icon:Icon,
}: CategoryItemProps)=>{
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");
    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
               ...(currentTitle && { title: currentTitle }),
               categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true});
        router.push(url);
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "py-2 px-3 text-sm border border-sky-700 bg-sky-100 text-sky-800 rounded-full flex items-center gap-x-1 hover:bg-sky-700 hover:text-white hover:shadow-sm hover:scale-105 active:scale-95 transition-all duration-300",
                isSelected && "bg-sky-700 text-white"
            )}
            type="button"
        >
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>

        </button>
    )
}
