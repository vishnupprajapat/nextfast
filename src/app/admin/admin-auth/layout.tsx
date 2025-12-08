export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No authentication check for login page
  return <>{children}</>;
}
