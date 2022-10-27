import { lazy } from "solid-js";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./index.js"))
  },

  {
    path: "/builder",
    component: lazy(() => import("./builder"))
  },

  {
    path: "/*all",
    component: lazy(() => import("./404.js"))
  },
]

export default routes