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
      {/* Desktop menu, nascosto per schermi piccoli */}
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

      {/* Mobile menu con Drawer DaisyUI */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* hamburger */}
            <label
              htmlFor="my-drawer"
              className="btn btn-circle bg-black/50 border-none text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="relative w-64 min-h-full bg-black/100 text-white p-4">
              {/* Bottone X per chiudere */}
              <label
                htmlFor="my-drawer"
                className="btn btn-sm btn-circle absolute right-4 top-4 text-white bg-red-600 border-none hover:bg-red-700"
              >
                ✕
              </label>

              <ul className="menu mt-20 mx-auto">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
                <li>
                  <DarkTheme />
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
