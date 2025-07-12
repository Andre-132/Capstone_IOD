"use client";
import ModeToggle from "@/app/components/ui/mode-toggle";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl left-10 top-10" />
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-gray-700/5 to-gray-600/5 blur-2xl right-10 bottom-10" />
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="relative z-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-white/90 hover:text-white">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon className="text-white/70" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/about"
                    className="text-white/90 hover:text-white"
                  >
                    About
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon className="text-white/70" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog" className="text-white/90 hover:text-white">
                    Blog
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="text-center space-y-4 relative z-10 pt-20">
        <h1 className="text-6xl md:text-7xl font-thin tracking-wide text-white">
          Ride Smarter, <span className="text-gray-300">Ride Scenic</span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"></div>
        <h3 className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
          Explore motorcycle-friendly routes, discover scenic roads, and ride
          safe!
        </h3>
        <h3 className="text-lg text-gray-400 font-light">
          This blog is for everything motorcycle related.
        </h3>

        <div className="pt-8"></div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-white/30"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-2 h-2 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}

export default Home;
