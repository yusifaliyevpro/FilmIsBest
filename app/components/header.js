"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
} from "@nextui-org/navbar";
import { Select, SelectItem } from "@nextui-org/select";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMainPage = pathname === "/";

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="mt-2 min-h-10 select-none bg-gray-100 font-bold"
      isBlurred={true}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
          "data-[active=true]:after:mb-3",
        ],
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link
            href="/"
            className="relative left-0 flex flex-row items-center gap-1.5 text-xl font-bold"
          >
            <i className="bx bxs-movie text-2xl font-normal text-blue-600"></i>
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-16 sm:flex" justify="center">
        <NavbarItem isActive={isMainPage}>
          <Link
            color="foreground"
            className="text-lg"
            href="/"
            aria-current="page"
          >
            Ana Səhifə
          </Link>
        </NavbarItem>
        <NavbarItem isActive={!isMainPage}>
          <Link href="/movies" className="text-lg" aria-current="page">
            Filmlər
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Select
            className=" w-40 "
            defaultSelectedKeys="1"
            aria-label="AZ"
            placeholder="AZ"
            variant="underlined"
            size="lg"
            isDisabled={true}
            startContent={<i className="bx bx-globe text-3xl"></i>}
          >
            <SelectItem key={1} textValue="AZ">
              Azərbaycanca
            </SelectItem>
            <SelectItem key={2} textValue="EN" className="text-lg font-bold">
              İngiliscə
            </SelectItem>
          </Select>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="items-center gap-3 overflow-hidden bg-gray-100">
        <NavbarMenuItem key={0} className="mb-5 mt-5">
          <Select
            className=" w-40 "
            defaultSelectedKeys="1"
            placeholder="AZ"
            variant="underlined"
            isDisabled={true}
            startContent={<i className="bx bx-globe text-3xl"></i>}
          >
            <SelectItem key={1} textValue="AZ">
              Azərbaycanca
            </SelectItem>
            <SelectItem key={2} textValue="EN" className="text-lg font-bold">
              İngiliscə
            </SelectItem>
          </Select>
        </NavbarMenuItem>
        <NavbarMenuItem key={1}>
          <Link
            href="/"
            className={`${isMainPage ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
          >
            Ana Səhifə
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key={2}>
          <Link
            href="/movies"
            className={`${!isMainPage ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
          >
            Filmlər
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
    </Navbar>
  );
}
