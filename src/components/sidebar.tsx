import { useSession } from "next-auth/react";
import SidebarItem from "./sidebarItem";
import SidebarLoading from "./loading/sidebar-loading";

const Sidebar = () => {
  const { data: session, status } = useSession();

  return status === "loading" ? (
    <SidebarLoading />
  ) : (
    <SidebarItem session={session} />
  );
};

export default Sidebar;
