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
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push('/homepage');
    } else {
      // Handle errors
      console.error('Login failed');
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
