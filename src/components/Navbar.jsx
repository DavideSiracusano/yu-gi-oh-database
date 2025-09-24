import React from "react";
import Link from "next/link";
import DarkTheme from "./organisms/DarkTheme";

function Navbar() {
  return (
    <nav className="p-20 shadow-md bg-[url('/header.png')] bg-cover bg-center bg-black/50 bg-blend-overlay">
      {/* Link di navigazione */}
      <ul className="flex flex-col items-center gap-4 sm:flex-col md:flex-col lg:flex-row lg:justify-center lg:gap-6">
        <li className="link-home">
          <Link href="/" className=" text-white hover:text-blue-500">
            Home
          </Link>
        </li>
        <li className="link-decklist">
          <Link href="/decklist" className=" text-white hover:text-blue-500">
            Decklist
          </Link>
        </li>
        <li className="link-banlist">
          <Link href="/banlist" className=" text-white hover:text-blue-500">
            Banlist
          </Link>
        </li>
        <li className="link-about">
          <Link href="/about" className=" text-white hover:text-blue-500">
            About
          </Link>
        </li>
        <DarkTheme />
      </ul>
    </nav>
  );
}

export default Navbar;
