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

function App() {
  const queryClient = new QueryClient();

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
                path="/accounting-entries/park/transactions"
                element={<ParkAccountsTransactions />}
              />
              <Route
                path="/accounting-entries/post/transactions"
                element={<PostAccountsTransactions />}
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
