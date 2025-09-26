import React from "react";
import Link from "next/link";
import DarkTheme from "./organisms/DarkTheme";

function Navbar() {
  return (
    <nav className="relative p-4 sm:p-20 shadow-md bg-[url('/header.png')] bg-cover bg-center bg-black/50 bg-blend-overlay">
      {/* Desktop menu - nascosto su mobile */}
      <ul className="hidden lg:flex lg:justify-center lg:gap-6">
        <li className="link-home">
          <Link href="/" className="text-white hover:text-blue-500">
            Home
          </Link>
        </li>
        <li className="link-decklist">
          <Link href="/decklist" className="text-white hover:text-blue-500">
            Decklist
          </Link>
        </li>
        <li className="link-banlist">
          <Link href="/banlist" className="text-white hover:text-blue-500">
            Banlist
          </Link>
        </li>
        <li className="link-about">
          <Link href="/about" className="text-white hover:text-blue-500">
            About
          </Link>
        </li>
        <DarkTheme />
      </ul>

      {/* Mobile menu con DaisyUI drawer */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

          {/* Header con DarkTheme e hamburger */}
          <div className="drawer-content">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DarkTheme />
              </div>

              {/* DaisyUI Hamburger button */}
              <label
                htmlFor="mobile-menu"
                className="btn btn-circle swap swap-rotate"
              >
                <input type="checkbox" />
                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </div>
          </div>

          {/* Drawer side - il menu mobile */}
          <div className="drawer-side">
            <label htmlFor="mobile-menu" className="drawer-overlay"></label>
            <div className="menu min-h-full w-80 bg-black/80 backdrop-blur-md p-4">
              <ul className="flex flex-col items-center gap-4 pt-8">
                <li className="link-home w-full">
                  <Link
                    href="/"
                    className="btn btn-ghost btn-block text-white hover:text-blue-500 justify-center"
                  >
                    Home
                  </Link>
                </li>
                <li className="link-decklist w-full">
                  <Link
                    href="/decklist"
                    className="btn btn-ghost btn-block text-white hover:text-blue-500 justify-center"
                  >
                    Decklist
                  </Link>
                </li>
                <li className="link-banlist w-full">
                  <Link
                    href="/banlist"
                    className="btn btn-ghost btn-block text-white hover:text-blue-500 justify-center"
                  >
                    Banlist
                  </Link>
                </li>
                <li className="link-about w-full">
                  <Link
                    href="/about"
                    className="btn btn-ghost btn-block text-white hover:text-blue-500 justify-center"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
