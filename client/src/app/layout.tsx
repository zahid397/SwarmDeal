import './globals.css';
import { Providers } from './providers';
// Navbar component code omitted for brevity but goes in components/Navbar.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white"><Providers><main className="container mx-auto p-4">{children}</main></Providers></body>
    </html>
  );
}
