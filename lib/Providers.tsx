"use client";

import { store } from "@/redux/store";
import { FC, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {/* <Suspense fallback={<PageLoader />}> */}
      <ReduxProvider store={store}>{children}</ReduxProvider>
      {/* </Suspense> */}
    </>
  );
};

export default Providers;
