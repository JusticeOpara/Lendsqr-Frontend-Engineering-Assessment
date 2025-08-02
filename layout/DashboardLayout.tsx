
import { FC, ReactNode } from "react";
import {  SideNavigation, TopNavigation } from "./components";
import dashboard from "./dashboardlayout.module.scss";
import  profile from "@/public/assets/profile-pics.svg"
import Image from "next/image";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={dashboard.dashboard_wrapper}>

      <aside className={dashboard.sidebar}>
         <SideNavigation /> 

      </aside>
 
      <div className={dashboard.main_content}>
        
        <header className={dashboard.top_nav}>
          <TopNavigation userName="Adedeji" avatar={profile} />
        </header>

        <main className={dashboard.page_content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
