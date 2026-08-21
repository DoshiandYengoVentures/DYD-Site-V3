import type { Metadata } from "next";
import ServiceCard from "@/components/dashboard/ServiceCard";
import { getDashboardServiceDetails } from "@/lib/dashboard/services";

export const metadata: Metadata = { title: "Services — Doshi and Yengo Digital" };

export default function ServicesPage() {
  const services = getDashboardServiceDetails();

  return (
    <>
      <div className="db-page-head">
        <h1>Services</h1>
        <p>The services currently active on your account.</p>
      </div>

      <div className="db-grid db-grid-2">
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </div>
    </>
  );
}
