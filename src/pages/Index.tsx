import { useState } from "react";
import { Section } from "@/components/crm/data";
import Sidebar from "@/components/crm/Sidebar";
import TopBar from "@/components/crm/TopBar";
import {
  DashboardSection,
  OrdersSection,
  CatalogSection,
  ClientsSection,
  ContentSection,
} from "@/components/crm/Sections";

export default function Index() {
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "hsl(20 10% 5%)" }}>
      <Sidebar
        section={section}
        sidebarOpen={sidebarOpen}
        onSectionChange={setSection}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 overflow-y-auto" style={{ background: "hsl(20 10% 6%)" }}>
        <TopBar section={section} />

        <div className="p-8 animate-fade-in">
          {section === "dashboard" && <DashboardSection />}
          {section === "orders" && <OrdersSection />}
          {section === "catalog" && <CatalogSection />}
          {section === "clients" && <ClientsSection />}
          {section === "content" && <ContentSection />}
        </div>
      </main>
    </div>
  );
}
