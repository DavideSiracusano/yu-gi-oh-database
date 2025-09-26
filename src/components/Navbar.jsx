import React from "react";
import Link from "next/link";
import DarkTheme from "./organisms/DarkTheme";

function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Decklist", href: "/decklist" },
    { name: "Banlist", href: "/banlist" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="p-4 sm:p-20 shadow-md bg-[url('/header.png')] bg-cover bg-center">
      {/* Desktop menu */}
      <ul className="hidden lg:flex lg:justify-center lg:gap-6">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-white hover:text-blue-500">
              {link.name}
            </Link>
          </li>
        ))}
        <DarkTheme />
      </ul>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

          {/* Hamburger */}
          <div className="drawer-content flex justify-center items-center">
            <label
              htmlFor="mobile-menu"
              className="btn btn-circle swap swap-rotate"
            >
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400,145.49 366.51,112 256,222.51 145.49,112 112,145.49 222.51,256 112,366.51 145.49,400 256,289.49 366,400 400,366.51 289.49,256 400,145.49" />
              </svg>
            </label>
          </div>

          {/* Drawer side */}
          <div className="drawer-side">
            <label htmlFor="mobile-menu" className="drawer-overlay"></label>
            <div className="menu min-h-full w-80 bg-black/80 backdrop-blur-md p-4">
              <DarkTheme />
              <ul className="flex flex-col items-center gap-4 pt-8">
                <li className="buttonClose text-red-700">
                  <label htmlFor="mobile-menu">x</label>
                </li>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-blue-500 justify-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
