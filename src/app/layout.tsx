// This file is required by Next.js. The real <html>/<body> + providers live
// in src/app/[locale]/layout.tsx. Middleware redirects "/" -> "/{locale}".
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
