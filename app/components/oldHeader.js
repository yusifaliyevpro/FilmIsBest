"use client";
import Link from "next/link";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Ana Səhifə", "Filmlər"];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex min-h-10 w-full select-none items-center justify-around justify-items-center gap-20 bg-gray-100 p-4 pt-6 font-bold">
      <Link
        href="/"
        className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold"
      >
        <i className="bx bxs-movie text-2xl font-normal text-blue-600"></i>{" "}
        FilmIsBest
      </Link>
      <div className="relative flex lg:hidden ">
        <i className="bx bx-menu text-3xl"></i>
      </div>
      <ul className="relative hidden list-none flex-row items-center justify-around gap-16 pl-0 lg:flex">
        <Link href="/" className="text-lg">
          <li>Ana Səhifə</li>
        </Link>
        <Link href="/movies" className="text-lg">
          <li>Filmlər</li>
        </Link>
      </ul>
      <div className="hidden lg:flex">
        <i class="bx bx-globe text-3xl"></i>
      </div>
    </header>
  );
}
