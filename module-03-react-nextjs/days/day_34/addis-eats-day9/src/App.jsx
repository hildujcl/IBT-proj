import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSkeleton from "./components/LoadingSkeleton";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const Checkout = lazy(() => import("./pages/Checkout"));

const Receipt = lazy(() => import("./pages/Receipt"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="menu"
            element={
              <ErrorBoundary>
                <Menu />
              </ErrorBoundary>
            }
          />

          <Route
            path="cart"
            element={
              <ErrorBoundary>
                <Cart />
              </ErrorBoundary>
            }
          />

          <Route
            path="checkout"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <Checkout />
              </Suspense>
            }
          />

          <Route
            path="receipt"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <Receipt />
              </Suspense>
            }
          />

          <Route path="signin" element={<SignIn />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
