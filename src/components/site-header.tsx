"use client"

import Link from "next/link";
import {CodeXml, Feather, MenuIcon, Newspaper, Wallet2} from "lucide-react";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {ActionButton} from "@/components/action-button";
import {Icons} from "@/components/icons";
import {useState} from "react";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="py-4 border-b max-md:backdrop-blur-sm md:border-none sticky top-0 z-10">
      <div className="container max-md:px-4">
        <div
          className="flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur-sm ">
          <Link href="/">
            <div className="border size-10 rounded-lg inline-flex items-center justify-center">
              <Icons.logo className="size-8"/>
            </div>
          </Link>
          <section className="max-md:hidden">
            <nav className="flex gap-8 items-center text-sm">
              <Link href="#" className="text-white/70 hover:text-white transition">Features</Link>
              <Link href="#" className="text-white/70 hover:text-white transition">Developers</Link>
              <Link href="#" className="text-white/70 hover:text-white transition">Pricing</Link>
              <Link href="#" className="text-white/70 hover:text-white transition">Changelog</Link>
            </nav>
          </section>
          <section className="flex max-md:gap-4 items-center">
            <ActionButton label="Join Waitlist"/>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger>
                <MenuIcon className="size-9 md:hidden hover:text-white/70 transition"/>
              </DrawerTrigger>
              <DrawerContent className="p-8">
                <div className="inline-flex items-center center gap-3 mt-8">
                  <div className="border size-8 rounded-lg inline-flex items-center justify-center">
                    <Icons.logo className="size-6 h-auto"/>
                  </div>
                  <p className="font-bold">AI Startup Landing Page</p>
                </div>
                <div className="mt-8 mb-4">
                  <nav className="grid gap-4 items-center text-lg">
                    <Link href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                      <Feather className="size-6"/>
                      Features
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                      <CodeXml className="size-6"/>
                      Developers
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                      <Wallet2 className="size-6"/>
                      Pricing
                    </Link>
                    <Link href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                      <Newspaper className="size-6"/>
                      Changelog
                    </Link>
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </section>
        </div>
      </div>
    </header>
  )
}
