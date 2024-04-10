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
import TreasuryReceipts from "./pages/TreasuryReceive";
import TreasuryPayments from "./pages/TreasuryPayment";
import ParkAccountsTransactions from "./pages/ParkAccountsTransactions";
import PostAccountsTransactions from "./pages/PostAccountsTransactions";
import GeneralSettingsPage from "./components/settings/subpages/general-settings";
import TasksCategoriesPage from "./components/settings/subpages/tasks-categories/tasks-categories-settings";
import TasksSubCategoriesPage from "./components/settings/subpages/tasks-subcategories/tasks-subcategories-settings";
import OrgDepartmentsSettingsPage from "./components/settings/subpages/org-departments/org-departments-settings";
import OrgTitlesSettingsPage from "./components/settings/subpages/org-titles/org-titles-settings";
import AccountsTemplates from "./pages/AccountsTemplates";
import axios from "axios";
import EditParkAccountEntry from "./pages/EditParkAccountingEntry";
import ViewParkAccountEntry from "./pages/ViewParkAccountingEntry";
import ViewPostAccountEntry from "./pages/ViewPostAccountingEntry";
import EditTemplateForm from "./pages/EditTemplateForm";
import ViewTemplateForm from "./pages/ViewTemplate";
import ApplyTemplateForm from "./pages/ApplyTemplate";
import NewTreasuryPaymentBond from "./pages/NewTreasuryPaymentBond";
import NewTreasuryReceiveBond from "./pages/NewTreasuryReceiveBond";
import ViewTreasuryReceiveBond from "./pages/ViewTreasuryReceiveBond";
import EditTreasuryReceiveBond from "./pages/NewTreasuryReceiveBond";
import ViewTreasuryPaymentBond from "./pages/ViewTreasuryPaymentBond";
import EditTreasuryPaymentBond from "./pages/EditTreasuryPaymentBond";

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
                path="/accounting-entries/park/:id/view"
                element={<ViewParkAccountEntry />}
              />
              <Route
                path="/accounting-entries/park/:id"
                element={<EditParkAccountEntry />}
              />
              <Route
                path="/accounting-entries/post"
                element={<PostAccountingEntries />}
              />
              <Route
                path="/accounting-entries/post/:id/view"
                element={<ViewPostAccountEntry />}
              />
              <Route path="/treasury/receive" element={<TreasuryReceipts />} />
              <Route
                path="/treasury/receive/:id/view"
                element={<ViewTreasuryReceiveBond />}
              />
              <Route
                path="/treasury/receive/:id"
                element={<EditTreasuryReceiveBond />}
              />
              <Route
                path="/treasury/receive/new"
                element={<NewTreasuryReceiveBond />}
              />
              <Route path="/treasury/payment" element={<TreasuryPayments />} />
              <Route
                path="/treasury/payment/:id/view"
                element={<ViewTreasuryPaymentBond />}
              />
              <Route
                path="/treasury/payment/:id"
                element={<EditTreasuryPaymentBond />}
              />
              <Route
                path="/treasury/payment/new"
                element={<NewTreasuryPaymentBond />}
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
                path="/accounts/templates/:id"
                element={<EditTemplateForm />}
              />
              <Route
                path="/accounts/templates/:id/view"
                element={<ViewTemplateForm />}
              />
              <Route
                path="/accounts/templates/:id/apply"
                element={<ApplyTemplateForm />}
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
