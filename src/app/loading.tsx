import { Loading } from "@/shared/components/ui/Loading";

export default function LoadingPage() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Loading size="lg" />
    </div>
  );
}
