import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type PaginationAndSizeFooterProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  size: number;
  setSize: (size: number) => void;
  sizeOptions?: number[];
};

const PaginationAndSizeFooter = ({
  page,
  setPage,
  totalPages,
  size,
  setSize,
  sizeOptions = [10, 20, 30, 40, 50],
}: PaginationAndSizeFooterProps) => {
  return (
    <div className="flex items-center justify-between px-2 w-full mt-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${size}`}
          onValueChange={(value) => {
            setSize(parseInt(value));
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={size} />
          </SelectTrigger>
          <SelectContent side="top">
            {sizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPage(1)}
          disabled={page <= 1}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
export default PaginationAndSizeFooter;
