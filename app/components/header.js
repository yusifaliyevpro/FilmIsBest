"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
  Input,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { UserButton } from "@clerk/nextjs";
import firebaseApp from "../lib/firebase";
import {
  useAuth,
  SignedIn,
  SignInButton,
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
} from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import SuspenseButton from "./suspenseButton";
import { BiCode, BiSearch, BiSolidMovie } from "react-icons/bi";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const { getToken } = useAuth();
  const user = useAuth();

  useEffect(() => {
    if (user.isSignedIn) {
      const signInWithClerk = async () => {
        firebaseApp;
        const auth = getAuth();
        const token = await getToken({ template: "integration_firebase" });
        const userCredentials = await signInWithCustomToken(auth, token);
      };
      signInWithClerk();
    } else {
      return;
    }
  }, []);

  const notify = () =>
    toast("Bu özəllik hazırlanma mərhələsindədir", {
      icon: <BiCode className="text-xl font-bold" />,
    });

  const handleClick = () => {
    if (pathname !== "/movies") {
      router.push("/movies");
    } else {
      return;
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="min-h-10 select-none bg-gray-100/90 font-bold text-white backdrop-blur-md light:text-white dark:text-white"
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
            <BiSolidMovie className=" text-2xl font-normal text-blue-600" />
            <p className="font-bold text-inherit">FilmIsBest</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-16 sm:flex" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link
            color="foreground"
            className="hover: text-lg text-gray-300 hover:text-white"
            href="/"
            aria-current="page"
          >
            Ana Səhifə
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/movies"}>
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
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-full  mb-1 h-10",
              mainWrapper: "h-full",
              input: "text-small font-bold",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            className="hidden"
            placeholder="Film adı ilə axtarın"
            variant="bordered"
            size="lg"
            value={text}
            onChange={(e) => {
              setText(e.target.value.replace(/['\[\]\/\\()]/g, ""));
            }}
            radius="full"
            startContent={<BiSearch className="text-2xl font-bold" />}
            type="search"
          />
        </NavbarItem>
        <NavbarItem>
          <ClerkLoading>
            <SuspenseButton />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/movies" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button color="primary" className="text-md flex font-bold">
                  Daxil ol
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="max-h-[200px] items-center justify-center gap-3 overflow-hidden bg-gray-100/90 backdrop-blur-md ">
        <NavbarMenuItem key={1}>
          <Link
            href="/"
            className={`${pathname === "/" ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
          >
            Ana Səhifə
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key={2}>
          <Link
            href="/movies"
            className={`${pathname === "/movies" ? "text-blue-600" : "text-white"} w-full text-xl font-bold`}
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
