import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Toaster } from "react-hot-toast";
import Router from "./routes/routes";

function App() {
  return (
    <>
    <CssBaseline/>
    <Toaster
        position="top-right"
        gutter={8}
        containerClassName="toast-container-all"
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "toast-container",
          duration: 5000,
          // Default options for specific types
          error: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Router/>
    </>
  );
}

export default App;
