"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // Corrected import path
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const emailAsString = email as string;
    const password = formData.get("password");

    if (email === null || password === null) {
      setError("Email or password is missing");
      setLoading(false);
      return;
    }

    const params = new URLSearchParams();
    params.append("username", emailAsString);
    params.append("password", password as string);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.access_token); // Enregistrement du token dans localStorage
      router.push("/homepage");
    } else {
      const errorData = await response.json();
      setError("Login failed: " + (errorData.message || "Unknown error"));
    }
    setLoading(false);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SIGN-IN</CardTitle>
        <CardDescription>Please enter your credentials to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input className={"bg-white"} id="email" name="email" type="email" placeholder="your email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                className={"bg-white"}
                id="password"
                name="password"
                type="password"
                placeholder="your password"
                required
              />
            </div>
          </div>
          <CardFooter className="flex justify-center mt-4">
            <Button type="submit" variant="outline" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
