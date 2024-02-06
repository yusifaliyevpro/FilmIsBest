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
import toast from "react-hot-toast";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMainPage = pathname === "/";

  const notify = () =>
    toast("Bu özəllik hazırlanma mərhələsindədir", {
      icon: <i className="bx bx-code-alt text-xl font-bold"></i>,
    });

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="min-h-10 select-none bg-gray-100 font-bold text-white light:text-white dark:text-white"
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
            className="hover: text-lg text-gray-300 hover:text-white"
            href="/"
            aria-current="page"
          >
            Ana Səhifə
          </Link>
        </NavbarItem>
        <NavbarItem isActive={!isMainPage}>
          <Link
            href="/movies"
            className="text-lg  text-gray-300 hover:text-white"
            aria-current="page"
          >
            Filmlər
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem onClick={notify} className="hidden sm:flex">
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
      <NavbarMenu className="items-center gap-3 overflow-hidden bg-transparent">
        <NavbarMenuItem key={0} onClick={notify} className="mb-5 mt-5">
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
