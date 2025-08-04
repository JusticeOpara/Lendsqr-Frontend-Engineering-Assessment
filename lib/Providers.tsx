"use client";

import { store } from "@/redux/store";
import { FC, ReactNode, Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
// import { store } from "@/store";


const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {/* <Suspense fallback={<PageLoader />}> */}
        <ReduxProvider store={store}>
         {children}
        </ReduxProvider>
      {/* </Suspense> */}
   
    </>
  );
};

export default Providers;
