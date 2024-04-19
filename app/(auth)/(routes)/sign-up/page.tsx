'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
