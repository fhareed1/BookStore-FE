import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/authServices";
import { RoleType, SignUpType } from "@/types/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useAuth } from "@/store/useAuth";

const Signup = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleType | null>(null);

  const navigate = useNavigate();

  // React Query
  const { mutate: signUp, status } = useMutation({
    mutationFn: (payload: SignUpType) => authServices.signUp(payload),
    onSuccess: (data) => {
      if (data.data.user !== user) {
        // Avoid unnecessary state updates
        setUser(data.data.user);
      }
      toast.success("Registration successful");
      navigate(ROUTES.login);
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      toast.error("Role is required");
      return;
    }

    const payload: SignUpType = {
      email,
      password,
      role, // Now correctly sends "USER" or "ADMIN"
    };

    signUp(payload);
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Sign up</CardTitle>
                <CardDescription>
                  Enter your email below to Sign Up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
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
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="label">Label</Label>
                      <div className="flex items-center">
                        <Select
                          value={role ?? ""}
                          onValueChange={(value) => setRole(value as RoleType)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Role</SelectLabel>
                              <SelectItem value={RoleType.USER}>
                                User
                              </SelectItem>
                              <SelectItem value={RoleType.ADMIN}>
                                Admin
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      {status === "pending" ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Have an account?{" "}
                    <Link
                      to={ROUTES.login}
                      className="underline underline-offset-4"
                    >
                      Sign In
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
