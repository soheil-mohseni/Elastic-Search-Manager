import * as React from "react";
import { useRoutes } from "react-router-dom";
import LoadingScreen from "../global/components/loading";
// ----------------------------------------------------------------------

const Loadable = (Component:any) => (props:any) => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default function Routers() {
  return useRoutes([
    // User Dashboard Routes
    {
      path: "dashboard",
      children: [
        {
          path: "config",
          element: <Config />,
        },
        {
          path: "generator",
          element: <Core />,
        },
        // {
        //   path: "404",
        //   element: <FundInfo />,
        // },
      ],
    },

    // Main Routes
  ]);
}

// DASHBOARD

// ASSET
const Config = Loadable(React.lazy(() => import("../pages/config/index")));

const Core = Loadable(
  React.lazy(() => import("../pages/core/index"))
);
