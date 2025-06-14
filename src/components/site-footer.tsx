import {Icons} from "@/components/icons";
import { siteConfig } from "@/site-config";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Star} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";

export default function SiteFooter() {
  return (
    <>
      <footer className="py-6 md:px-8 md:py-0 border-t-2">
        <div className="container md:px-20 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <section className="flex items-center gap-3">
            <div className="border size-8 rounded-lg inline-flex items-center justify-center">
              <Icons.logo className="size-6 h-auto"/>
            </div>
            <p className="font-medium">AI Startup Landing Page</p>
          </section>
          <div>
            <ul className="flex justify-center gap-3 text-white/40">
              <li className="hover:text-white cursor-pointer"><Icons.x/></li>
              <li className="hover:text-white cursor-pointer"><Icons.instagram /></li>
              <li className="hover:text-white cursor-pointer"><Icons.youtube/></li>
            </ul>
          </div>
        </div>
      </footer>
      <section className="bg-black border-t-2 p-4">
        <div className="md:px-20 container flex max-md:flex-col max-md:gap-4 items-center justify-between">
          <div className="text-sm text-muted-foreground max-md:text-center max-md:text-balance">
            Build by <a href={siteConfig.links.creatorGithubUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 font-medium">Moussa</a>.
            The source code is available on <a href={siteConfig.links.repositoryUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 font-medium">GitHub</a>.
          </div>
          <div className="max-md:hidden">
            <Link
              href={siteConfig.links.repositoryUrl}
              target="_blank" rel="noreferrer" className={cn(buttonVariants({variant: "outline", size: "sm"}))}
            >
              <Star className="size-4 fill-current" /> Star on GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
