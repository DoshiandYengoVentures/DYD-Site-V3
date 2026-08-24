import type { Metadata } from "next";
import * as userService from "@/lib/users/service";

export const metadata: Metadata = { title: "Customers — Owner Dashboard" };

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function OwnerCustomersPage() {
  const [customers, totalCustomers] = await Promise.all([
    userService.listCustomers(),
    userService.countCustomers(),
  ]);

  return (
    <>
      <div className="ow-page-head">
        <h1>Customers</h1>
        <p>Every customer account currently signed up.</p>
      </div>

      <div className="ow-stat-card">
        <div className="ow-stat-label">Total Customers</div>
        <div className="ow-stat-value">{totalCustomers}</div>
      </div>

      <div className="ow-panel">
        {customers.length === 0 ? (
          <div className="ow-empty">No customers yet.</div>
        ) : (
          <div className="ow-table-wrap">
            <table className="ow-table">
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th>Contact Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Email Confirmed</th>
                  <th>Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.businessName}</td>
                    <td>{customer.contactName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone || "—"}</td>
                    <td>{customer.emailConfirmed ? "Yes" : "No"}</td>
                    <td>{formatDate(customer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
