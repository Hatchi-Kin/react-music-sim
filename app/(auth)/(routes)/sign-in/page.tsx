'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Make sure the import path is correct
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === null || password === null) {
      throw new Error("Email or password is missing");
    }

    const params = new URLSearchParams();
    params.append("username", email as string);
    params.append("password", password as string);

    const response = await fetch("https://api.music-sim.fr/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (response.ok) {
      router.push('/homepage');
    } else {
      const errorData = await response.json();
      console.error('Login failed', errorData);
      // Now handle the errorData, show it to the user if appropriate
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SIGN-IN</CardTitle>
        <CardDescription>Please enter your credentials to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="your password" required />
            </div>
          </div>
          <CardFooter className="flex justify-center mt-4">
            <Button type="submit" variant="outline">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
