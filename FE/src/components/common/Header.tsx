"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close the menu on navigation
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      {user && (
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Medical Diagnosis Assistant
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
            <NavLink
              label="Home"
              path="/"
              pathname={pathname}
              onClick={handleNavClick}
            />
            <NavLink
              label="Health History"
              path="/health-tracker"
              pathname={pathname}
              onClick={handleNavClick}
            />
            <NavLink
              label="Clinic Locator"
              path="/clinic-locator"
              pathname={pathname}
              onClick={handleNavClick}
            />
            <div className="flex items-center gap-2 md:gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>

          {/* Mobile Nav Toggle + User */}
          <div className="md:hidden flex items-center gap-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
            <NavLink
              label="Home"
              path="/"
              pathname={pathname}
              onClick={handleNavClick}
            />
            <NavLink
              label="Health History"
              path="/health-tracker"
              pathname={pathname}
              onClick={handleNavClick}
            />
            <NavLink
              label="Clinic Locator"
              path="/clinic-locator"
              pathname={pathname}
              onClick={handleNavClick}
            />
            <div className="flex flex-col gap-2 pt-2">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({
  label,
  path,
  pathname,
  onClick,
}: {
  label: string;
  path: string;
  pathname: string;
  onClick: (path: string) => void;
}) => (
  <Button
    variant="ghost"
    onClick={() => onClick(path)}
    className={`${
      pathname === path ? "text-blue-600" : "text-gray-600"
    } hover:text-gray-900 text-sm md:text-base text-left w-full md:w-auto`}
  >
    {label}
  </Button>
);

export default Header;
