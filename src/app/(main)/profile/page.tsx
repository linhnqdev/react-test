"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loading } from "@/shared/components/ui/Loading";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container">
        <Loading size="lg" text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="mb-4">User Profile</h1>

          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <strong>Name:</strong> {user?.name || "N/A"}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user?.email || "N/A"}
              </div>
              <div className="mb-3">
                <strong>Role:</strong> {user?.role || "User"}
              </div>
              {user?.createdAt && (
                <div className="mb-3">
                  <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
