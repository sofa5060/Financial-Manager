import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { FlowerSpinner } from "react-epic-spinners";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageLayout from "./layout";
import AccountsCharts from "./pages/AccountsCharts";
import CostCentersCharts from "./pages/CostCentersCharts";
import ParkAccountingEntries from "./pages/ParkAccountingEntries";
import Redirect from "./lib/Redirect";
import PostAccountingEntries from "./pages/PostAccountingEntries";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="grid place-items-center w-full h-full">
            <FlowerSpinner color="green" size={100} />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route path="/" element={<AccountsCharts />} />
              <Route path="/cost-centers" element={<CostCentersCharts />} />
              <Route
                path="/accounting-entries"
                element={<Redirect to="/accounting-entries/park" />}
              />
              <Route
                path="/accounting-entries/park"
                element={<ParkAccountingEntries />}
              />
              <Route
                path="/accounting-entries/post"
                element={<PostAccountingEntries />}
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
