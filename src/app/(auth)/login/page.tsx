"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { loginSchema, type ILoginFormData } from "@/lib/zod-schemas";
import { useState } from "react";

export default function LoginPage() {
  const { login, isLoading, loginError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginFormData) => {
    try {
      setSubmitError(null);
      await login(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-center">Login</h1>

              {(loginError || submitError) && (
                <div className="alert alert-danger" role="alert">
                  {submitError ||
                    (loginError instanceof Error ? loginError.message : "Login failed")}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-3"
                >
                  Login
                </Button>
              </form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
