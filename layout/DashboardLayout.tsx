
import { FC, ReactNode } from "react";
import { SideNavigation, TopNavigation } from "./components";
import dashboard from "./dashboardlayout.module.scss";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={dashboard.dashboard_wrapper}>

      <aside className={dashboard.sidebar}>
        <SideNavigation />
      </aside>
 
      <div className={dashboard.main_content}>
        
        <header className={dashboard.top_nav}>
          <TopNavigation userName="Adedeji" avatar="/avatar.jpg" />
        </header>

        <main className={dashboard.page_content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
