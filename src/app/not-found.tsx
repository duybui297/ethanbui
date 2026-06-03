import { redirect } from 'next/navigation';

// Catch-all root not-found: send to default locale's 404.
export default function NotFound() {
  redirect('/en');
}
