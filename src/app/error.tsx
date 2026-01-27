"use client";

import { useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-1 text-danger">Oops!</h1>
          <h2 className="mb-4">Something went wrong</h2>
          <p className="text-muted mb-4">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="primary" onClick={reset}>
              Try Again
            </Button>
            <Button variant="secondary" onClick={() => (window.location.href = "/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
