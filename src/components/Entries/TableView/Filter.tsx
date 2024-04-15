import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type FiltersProps = {
  title: string;
  options: {
    label: string;
    value: string | number;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultSelected?: string[] | number[];
  setOuterValue: (value: string[] | number[]) => void;
};

const Filter = ({
  title,
  options,
  defaultSelected = [],
  setOuterValue,
}: FiltersProps) => {
  const [selectedValues, setSelectedValues] = useState(
    new Set(defaultSelected as string[])
  );

  useEffect(() => {
    setSelectedValues(new Set(defaultSelected as string[]));
  }, [defaultSelected]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="me-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden bg-primary text-white"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal bg-primary text-white"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) =>
                      selectedValues.has(option.value as string)
                    )
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal bg-primary text-white"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value as string);
          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={(e) => {
                console.log("option.value", option.value);
                if (isSelected) {
                  console.log(selectedValues);
                  selectedValues.delete(option.value as string);
                  console.log(selectedValues);
                } else {
                  selectedValues.add(option.value as string);
                }
                const filterValues = Array.from(selectedValues);
                setSelectedValues(new Set(filterValues));
                setOuterValue([...new Set(filterValues)] as
                  | string[]
                  | number[]);
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <div
                className={cn(
                  "me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible"
                )}
              >
                <CheckIcon className={cn("h-4 w-4")} />
              </div>
              {option.icon && (
                <option.icon className="me-2 h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-black">{option.label}</span>
            </DropdownMenuItem>
          );
        })}
        {selectedValues.size > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                setSelectedValues(new Set())
                setOuterValue([])
              }}
              className="justify-center text-center"
            >
              Clear filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Filter;
