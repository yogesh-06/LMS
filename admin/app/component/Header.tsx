"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = (props) => {
  const { open, setOpen, activeItem } = props;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-[80] h-20 w-full">
      <header
        className={`h-20 w-full border-b border-black/10 bg-white dark:border-white/10 dark:bg-gray-950
            ${
              active
                ? "fixed top-0 left-0 shadow-xl transition-all duration-300"
                : ""
            }`}
      >
        <div className="max-w-[1240px] h-full mx-auto flex items-center justify-between px-4">
          <div>
            <Link
              href="/"
              className="text-[20px] font-poppins font-[600] text-[#1e1e1e] dark:text-white"
            >
              Elearning
            </Link>
          </div>
          <nav className="hidden md:block" aria-label="Primary navigation">
            <NavItems activeItem={activeItem} isMobile={false} />
          </nav>

          <button
            type="button"
            className="rounded-md p-2 text-[#1e1e1e] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#dc143c] md:hidden dark:text-white dark:hover:bg-white/10"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <nav
            className="absolute top-20 left-0 w-full border-b border-black/10 bg-white px-4 pb-4 shadow-lg md:hidden dark:border-white/10 dark:bg-gray-950"
            aria-label="Mobile navigation"
          >
            <NavItems activeItem={activeItem} isMobile />
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
