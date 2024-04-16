"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { arrFromQuery, serializeFormQuery } from "@/lib/utils";
import { useUsersStore } from "@/hooks/useUsersStore";
import Filter from "./Filter";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useTranslation } from "react-i18next";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation("transactions");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [createdBySearchTerm, setCreatedBySearchTerm] = useState<number[]>(
    arrFromQuery(searchParams.get("created_by"))
  );
  const [postedBySearchTerm, setPostedBySearchTerm] = useState<number[]>(
    arrFromQuery(searchParams.get("posted_by"))
  );
  const [updatedBySearchTerm, setUpdatedBySearchTerm] = useState<number[]>(
    arrFromQuery(searchParams.get("updated_by"))
  );
  const [currencySearchTerm, setCurrencySearchTerm] = useState<number[]>(
    arrFromQuery(searchParams.get("currency_id"))
  );
  const [isFiltered, setIsFiltered] = useState(searchParams.toString() !== "");
  const usersOptions = useUsersStore((state) => state.usersOptions);
  const currenciesOptions = useCurrenciesStore(
    (state) => state.currenciesOptions
  );

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = {
      search: searchTerm,
      created_by: createdBySearchTerm,
      posted_by: postedBySearchTerm,
      updated_by: updatedBySearchTerm,
      currency_id: currencySearchTerm,
    };

    const serializedParams = serializeFormQuery(params);
    if (serializedParams === "") {
      clearFilters();
      return;
    }
    navigate(`?${serializedParams}`);
    setIsFiltered(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCreatedBySearchTerm([]);
    setPostedBySearchTerm([]);
    setUpdatedBySearchTerm([]);
    setCurrencySearchTerm([]);
    setIsFiltered(false);
    navigate("");
  };

  return (
    <div className="flex items-center justify-between max-lg:justify-start gap-4 flex-wrap">
      <form
        className="flex flex-1 items-center gap-2 gap-y-4 flex-wrap justify-between"
        onSubmit={handleSearch}
      >
        <div className="flex gap-2 items-center">
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="h-10 w-[250px] lg:w-[350px]"
          />
          <Button type="submit">{t("search")}</Button>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-8 px-2 lg:px-3"
            >
              {t("resetFilters")}
              <Cross2Icon className="ms-2 h-4 w-4" />
            </Button>
          )}
          {table.getColumn("created_by_name") && usersOptions.length && (
            <Filter
              defaultSelected={createdBySearchTerm}
              setOuterValue={
                setCreatedBySearchTerm as (value: string[] | number[]) => void
              }
              title={t("createdBy")}
              options={usersOptions}
            />
          )}
          {table.getColumn("posted_at") && usersOptions.length && (
            <Filter
              defaultSelected={postedBySearchTerm}
              setOuterValue={
                setPostedBySearchTerm as (value: string[] | number[]) => void
              }
              title={t("postedBy")}
              options={usersOptions}
            />
          )}
          {usersOptions.length && (
            <Filter
              defaultSelected={updatedBySearchTerm}
              setOuterValue={
                setUpdatedBySearchTerm as (value: string[] | number[]) => void
              }
              title={t("updatedBy")}
              options={usersOptions}
            />
          )}
          {currenciesOptions.length && (
            <Filter
              defaultSelected={currencySearchTerm}
              setOuterValue={
                setCurrencySearchTerm as (value: string[] | number[]) => void
              }
              title={t("currency")}
              options={currenciesOptions}
            />
          )}
        </div>
      </form>
      <div className="flex gap-2 gap-y-4 flex-wrap">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
