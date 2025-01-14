import React, { Suspense } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Spinner } from "flowbite-react";

const Home = React.lazy(() => import("@pages/Home"));



function Navigation() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-2">
          <Spinner color={"success"} /> Getting resources...
        </div>
      }
    >
      <Routes>
        <Route path="/" index element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default Navigation;
