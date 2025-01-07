import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";

export default async function Sidebar({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
      <MobileFooter />
    </div>
  );
}
