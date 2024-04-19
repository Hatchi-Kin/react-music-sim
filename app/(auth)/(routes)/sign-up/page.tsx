'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    // Vous pouvez ajouter des champs supplémentaires si nécessaire

    if (password !== confirmPassword) {
      // Gérez l'erreur de confirmation du mot de passe
      return;
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Vous pouvez rediriger l'utilisateur vers la page de connexion ou directement vers leur profil
      router.push('/sign-in');
    } else {
      // Gérez les erreurs de réponse, par exemple un email déjà utilisé
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SIGN-UP</CardTitle>
        <CardDescription>Please enter your credentials to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your email" required/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="your password" required/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password"> confirm Password</Label>
              <Input id="password" name="password" type="password" placeholder="confirm password" required/>
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
