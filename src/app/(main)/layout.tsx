import { MainLayout } from "@/shared/components/layout/MainLayout";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
