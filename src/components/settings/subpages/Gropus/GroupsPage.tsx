import SettingsLayout from "../../settings-layout";
import { toast } from "@/components/ui/use-toast";
import TableSkeleton from "@/components/common/skeleton/table-skeleton";
import { DataTable } from "./TableView/DataTable";
import GroupsManager from "@/managers/GroupsManager";
import { useQuery } from "@tanstack/react-query";
import { FlowerSpinner } from "react-epic-spinners";
import { useGroupsColumns } from "./TableView/Columns";
import { useState } from "react";
import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";

const GroupsPage = () => {
  const { columns } = useGroupsColumns();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups", "page", page, "size", size],
    queryFn: () => GroupsManager.getGroups(page, size),
  });

  if (isLoading)
    return (
      <div className="grid place-items-center w-full h-full min-h-screen">
        <FlowerSpinner color="green" size={100} />
      </div>
    );

  if (isError) {
    toast({
      variant: "destructive",
      title: "Failed to fetch groups",
    });
    return <></>;
  }

  return (
    <SettingsLayout>
      {isLoading && <TableSkeleton />}
      {!isLoading && (
        <>
          <DataTable columns={columns} data={data!.groups} />
          <PaginationAndSizeFooter
            page={page}
            setPage={setPage}
            totalPages={data!.totalPages}
            size={size}
            setSize={setSize}
          />
        </>
      )}
    </SettingsLayout>
  );
};

export default GroupsPage;
