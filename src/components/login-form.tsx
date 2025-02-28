import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { LoginType } from "@/types/auth";
import authServices from "@/services/authServices";
import { useState } from "react";
import toast from "react-hot-toast";
import { ROUTES } from "@/router/routes";
// import { useAuth } from "@/store/useAuth";

export function LoginForm() {
  // const { user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: (payload: LoginType) => authServices.login(payload),
    onSuccess: () => {
      // if (data.data.user !== user) {
      //   // Avoid unnecessary state updates
      //   setUser(data.data.user);
      // }
      toast.success("Logged in successfully");
      navigate(ROUTES.dashboard);
    
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: LoginType = {
      email,
      password,
    };
    login(payload);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {status === "pending" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={ROUTES.signUp} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
