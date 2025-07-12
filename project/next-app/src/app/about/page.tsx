"use client";

import Link from "next/link";
import ModeToggle from "../components/ui/mode-toggle";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

function AboutPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
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
                <Link href="/about" className="text-white/90 hover:text-white">
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

        <ModeToggle />
      </div>

      <div className="flex h-full">
        <div className="w-1/2 bg-gradient-to-br from-black via-gray-500 to-black relative flex flex-col justify-center items-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

          <div className="flex items-center justify-center z-10">
            <div className="w-80 h-80 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className="text-8xl">🏍️</div>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-16 flex flex-col justify-center relative overflow-y-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-serif text-gray-800">
                My Vision
              </h1>
              <p className="text-xl text-gray-600 font-serif">
                My vision with this application is to provide bikers like myself
                a safe and comfortable riding experience.
              </p>
              <h2 className="text-3xl font-bold font-serif text-gray-800 mt-8">
                My Purpose
              </h2>
              <p className="text-xl text-gray-600 font-serif">
                With my focus being tailored to rider safety along with an
                interactive community of bikers alike.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        #__next {
          margin: 0;
          padding: 0;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AboutPage;
