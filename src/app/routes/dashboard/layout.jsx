export default function DashboardLayout({ children }) {
  return (
    <div>
      <p>shared layout for dashboard and its sub-routes goes here</p>
      <div>{children}</div>
    </div>
  );
}
