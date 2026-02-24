import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface TooltipCellProps {
  name: string;
  description: string;
}

const TooltipCell = ({ name, description }: TooltipCellProps) => {
  if (!description) return <span>{name}</span>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1 cursor-help">
          {name}
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs text-sm">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipCell;
