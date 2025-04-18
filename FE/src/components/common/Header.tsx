"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Medical Diagnosis Assistant
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className={`${
              pathname === "/" ? "text-blue-600" : "text-gray-600"
            } hover:text-gray-900`}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/health-tracker")}
            className={`${
              pathname === "/health-tracker" ? "text-blue-600" : "text-gray-600"
            } hover:text-gray-900`}
          >
            Health History
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/clinic-locator")}
            className={`${
              pathname === "/clinic-locator" ? "text-blue-600" : "text-gray-600"
            } hover:text-gray-900`}
          >
            Clinic Locator
          </Button>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </nav>
      </div>
    </header>
  );
};

export default Header;
