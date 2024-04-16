import PaginationAndSizeFooter from "@/components/common/PaginationAndSizeFooter/PaginationAndSizeFooter";
import { useTreasuryPaymentBondsColumns } from "@/components/Treasury/TableView/Columns";
import { DataTable } from "@/components/Treasury/TableView/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TreasuryManager from "@/managers/TreasuryManager";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const TreasuryPayments = () => {
  const { t } = useTranslation("treasury");
  const [searchParams] = useSearchParams();
  const columns = useTreasuryPaymentBondsColumns();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "bonds",
      "payment",
      "page",
      page,
      "size",
      size,
      "search",
      searchParams.toString(),
    ],
    queryFn: () =>
      TreasuryManager.getPaymentTreasuryBonds(
        page,
        size,
        searchParams.toString()
      ),
  });

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");

    setPage(page);
    setSize(size);
  }, [searchParams]);

  if (isLoading)
    return (
      <div className="grid place-items-center w-full h-full min-h-screen">
        <FlowerSpinner color="green" size={100} />
      </div>
    );

  if (isError) {
    toast({
      variant: "destructive",
      title: t("bonds.failed"),
    });
    return <></>;
  }

  return (
    <div>
      <div className="flex gap-5 justify-between max-sm:flex-col">
        <h1 className="font-semibold text-2xl">
          {t("treasury")} <span className="text-primary">{t("paymentBonds")}</span>
        </h1>
        <div className="flex gap-5">
          <Button className="btn-outline me-4">{t("printSelected")}</Button>
          <Button
            className="btn-primary"
            onClick={() => navigate("/treasury/payment/new")}
          >
            <Plus className="me-2 w-4" />
            {t("newBond")}
          </Button>
        </div>
      </div>
      <DataTable data={data!.bonds} columns={columns} />
      <PaginationAndSizeFooter
        page={page}
        setPage={setPage}
        totalPages={data!.totalPages}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};
export default TreasuryPayments;
