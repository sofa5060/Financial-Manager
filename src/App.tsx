import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLayout from "./layout";
import AccountsCharts from "./pages/AccountsCharts";
import CostCentersCharts from "./pages/CostCentersCharts";
import ParkAccountingEntries from "./pages/ParkAccountingEntries";
import PostAccountingEntries from "./pages/PostAccountingEntries";
import LoginPage from "./pages/Login";
import NewParkAccountEntry from "./pages/NewParkAccountingEntry";
import TreasuryReceipts from "./pages/TreasuryReceipt";
import TreasuryPayments from "./pages/TreasuryPayment";
import TreasuryReceiptBond from "./pages/TreasuryReceiptBond";
import TreasuryPaymentBond from "./pages/TreasuryPaymentBond";
import ParkAccountsTransactions from "./pages/ParkAccountsTransactions";
import PostAccountsTransactions from "./pages/PostAccountsTransactions";
import GeneralSettingsPage from "./components/settings/subpages/general-settings";
import TasksCategoriesPage from "./components/settings/subpages/tasks-categories/tasks-categories-settings";
import TasksSubCategoriesPage from "./components/settings/subpages/tasks-subcategories/tasks-subcategories-settings";
import OrgDepartmentsSettingsPage from "./components/settings/subpages/org-departments/org-departments-settings";
import OrgTitlesSettingsPage from "./components/settings/subpages/org-titles/org-titles-settings";
import AccountsTemplates from "./pages/AccountsTemplates";
import AccountsTemplateForm from "./pages/AccountsTemplateForm";
import axios from "axios";

function App() {
  const queryClient = new QueryClient();
  axios.defaults.baseURL = import.meta.env.VITE_API_ROOT;
  axios.defaults.headers.common["Accept"] = "application/json";

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="grid place-items-center w-full h-full min-h-screen">
            <FlowerSpinner color="green" size={100} />
          </div>
        }
      >
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<PageLayout />}>
                <Route path="/" element={<AccountsCharts />} />
                <Route path="/cost-centers" element={<CostCentersCharts />} />
                <Route
                  path="/accounting-entries"
                  element={<Navigate to="/accounting-entries/park" />}
                />
                <Route
                  path="/accounting-entries/park"
                  element={<ParkAccountingEntries />}
                />
                <Route
                  path="/accounting-entries/park/new"
                  element={<NewParkAccountEntry />}
                />
                <Route
                  path="/accounting-entries/post"
                  element={<PostAccountingEntries />}
                />
                <Route
                  path="/treasury-receipts/new"
                  element={<TreasuryReceiptBond />}
                />
                <Route
                  path="/treasury-receipts"
                  element={<TreasuryReceipts />}
                />
                <Route
                  path="/treasury-payments/new"
                  element={<TreasuryPaymentBond />}
                />
                <Route
                  path="/treasury-payments"
                  element={<TreasuryPayments />}
                />
                <Route
                  path="/transactions/park"
                  element={<ParkAccountsTransactions key="park" />}
                />
                <Route
                  path="/transactions/post"
                  element={<PostAccountsTransactions key="post" />}
                />
                <Route
                  path="/accounts/templates"
                  element={<AccountsTemplates />}
                />
                <Route
                  path="/accounts/templates/new"
                  element={<AccountsTemplateForm />}
                />
                <Route path="/settings" element={<GeneralSettingsPage />} />
                <Route
                  path="settings/taskcat"
                  element={<TasksCategoriesPage />}
                />
                <Route
                  path="settings/tasksubcat"
                  element={<TasksSubCategoriesPage />}
                />
                <Route
                  path="settings/orgdep"
                  element={<OrgDepartmentsSettingsPage />}
                />
                <Route
                  path="settings/orgtitles"
                  element={<OrgTitlesSettingsPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
