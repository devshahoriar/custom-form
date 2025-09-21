import { ModeToggle } from '@/components/shared/ThemeChange';
import Link from "next/link";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <nav className="bg-cyan-700 shadow-md">
        <div className="container mx-auto py-5 flex items-center justify-between">
          <Link href={"/"} className="text-2xl font-semibold text-white">
            My Hr
          </Link>
          <ModeToggle/>
        </div>
      </nav>
      {children}
    </main>
  );
};

export default layout;
