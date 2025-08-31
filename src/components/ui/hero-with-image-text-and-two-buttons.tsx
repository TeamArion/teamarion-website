"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link"; // ✅ import Link from Next.js

function Hero() {
  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left column - text */}
          <div className="flex flex-col gap-6 max-w-xl text-left">
            <Badge variant="outline" className="w-fit">
              We're live!
            </Badge>

            <h1 className="text-5xl md:text-7xl font-regular tracking-tighter">
              NMIT's Formula Student Team
            </h1>

            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>

            <div className="flex flex-row gap-4 mt-4">
              <Button size="lg" className="gap-2" variant="outline">
                Learn More <PhoneCall className="w-4 h-4" />
              </Button>

              {/* ✅ Wrap Apply Now with Next.js Link */}
              <Link href="/application-form" passHref>
                <Button size="lg" className="gap-2">
                  Apply Now <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column - image */}
          <div className="w-full max-w-xl lg:max-w-2xl">
            <Image
              src="/ar25_render.png"
              alt="AR25 Render"
              width={800}
              height={800}
              priority
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
