"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container mx-auto border-b">
      <div className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl font-bold">Employee Onboarding</h1>
          <p>Welcome to employee system</p>
        </div>
        <div>
          <Button asChild>
            <Link href={"/addEmploy"}>go</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
