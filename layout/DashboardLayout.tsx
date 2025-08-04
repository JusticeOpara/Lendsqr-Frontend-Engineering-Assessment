import { FC, ReactNode } from "react";
import { SideNavigation, TopNavigation } from "./components";
import dashboard from "./dashboardlayout.module.scss";
import profile from "@/public/assets/profile-pics.svg";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className={dashboard.dashboard_wrapper}>
      <SideNavigation />

      <div className={dashboard.main_content}>
        <TopNavigation userName="Adedeji" avatar={profile} />

        <main className={dashboard.page_content}>
          <div className={dashboard.content}>{children}</div>
        </main>
      </div>
    </main>
  );
};

export default DashboardLayout;
