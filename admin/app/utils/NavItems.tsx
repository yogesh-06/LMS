import { FC } from "react";
import Link from "next/link";

export const navItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "Students",
    link: "/students",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: " Policies",
    link: "/policies",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  const itemClassName = (isActive: boolean) =>
    isActive
      ? "text-crimson dark:text-[#37a39a] font-semibold"
      : "text-[#1e1e1e] dark:text-white hover:text-crimson dark:hover:text-[#37a39a]";

  return (
    <div
      className={
        isMobile
          ? "mt-4 flex flex-col gap-1"
          : "flex items-center gap-4 lg:gap-6"
      }
    >
        {navItems.map((item, index) => (
          <Link
            key={item.link}
            href={item.link}
            className={`${itemClassName(activeItem === index)} block rounded-md font-medium transition-colors duration-200 ${
              isMobile
                ? "px-3 py-2 text-base hover:bg-black/5 dark:hover:bg-white/10"
                : "py-2 text-sm lg:text-base"
            }`}
          >
            {item.name}
          </Link>
        ))}
    </div>
  );
};

export default NavItems;
