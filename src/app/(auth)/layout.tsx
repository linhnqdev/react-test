import { MainLayout } from "@/shared/components/layout/MainLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
