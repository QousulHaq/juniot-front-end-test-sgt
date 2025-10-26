import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/auth/AuthGurad";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Navbar />
      <main className="main-container p-6 text-gray-900 dark:text-gray-100">
        <AntdRegistry>{children}</AntdRegistry>
      </main>
    </AuthGuard>
  );
}
