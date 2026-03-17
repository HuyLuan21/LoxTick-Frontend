// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { TooltipProvider } from "./components/ui/tooltip";
import { RouterProvider } from "react-router";
import router from "./router";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </Provider>,
  // </StrictMode>,
);
