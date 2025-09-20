import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <nav className="bg-cyan-700 shadow-md">
        <div className="container mx-auto py-5">
          <h1 className="text-2xl font-semibold text-white">My Hr</h1>
        </div>
      </nav>
      {children}
    </main>
  );
};

export default layout;
