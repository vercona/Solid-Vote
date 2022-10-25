import { lazy } from "solid-js";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./index.js"))
  },

  {
    path: "/test",
    component: lazy(() => import("./test"))
  },

  {
    path: "/*all",
    component: lazy(() => import("./404.js"))
  },
]

export default routes