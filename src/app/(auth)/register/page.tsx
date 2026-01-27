"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { registerSchema, type IRegisterFormData } from "@/lib/zod-schemas";
import { useState } from "react";

export default function RegisterPage() {
  const { register: registerUser, isLoading, registerError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: IRegisterFormData) => {
    try {
      setSubmitError(null);
      await registerUser(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body p-4">
              <h1 className="h3 mb-4 text-center">Register</h1>

              {(registerError || submitError) && (
                <div className="alert alert-danger" role="alert">
                  {submitError ||
                    (registerError instanceof Error
                      ? registerError.message
                      : "Registration failed")}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  error={errors.name?.message}
                  {...register("name")}
                />

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
                  helperText="Must be at least 8 characters with uppercase, lowercase, number, and special character"
                  {...register("password")}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  className="mt-3"
                >
                  Register
                </Button>
              </form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Already have an account? <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
