import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {formatPrice} from "@/lib/format"

import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface DataCardProps{
    value:number;
    label:string
    shouldFormat?:boolean;
    icon?: LucideIcon;
}


export const DataCard = ({
    value,
    label,
    shouldFormat,
    icon: Icon,
}:DataCardProps) =>{
    return(
        <Card className="border border-sky-700 ring-0">
            <CardHeader className="flex flex-row items-center gap-x-3 space-y-0 pb-2">
              {Icon && <IconBadge icon={Icon} />}
              <CardTitle className="text-md font-medium">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    {shouldFormat ? formatPrice(value):value}
                </div>
            </CardContent>
        </Card>
    )
}