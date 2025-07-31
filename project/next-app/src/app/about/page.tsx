"use client";
import Image from "next/image";
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
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
        }}
      >
        <div className="w-1/2 absolute top-0 left-0 bottom-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col justify-center items-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
          <div className="flex items-center justify-center z-10">
            <div className="w-80 h-80 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <Image
                src="/IMG_0455.jpg"
                alt="Biker Photo"
                width={500}
                height={500}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-16 flex flex-col justify-center relative overflow-y-auto ml-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white-800">My Vision</h1>
              <p className="text-xl text-white-600">
                My vision with this application is to provide bikers like myself
                a safe and comfortable riding experience.
              </p>
              <h2 className="text-3xl font-bold text-white-800 mt-8">
                My Purpose
              </h2>
              <p className="text-xl text-white-600">
                With my focus being tailored to rider safety along with an
                interactive community of bikers alike.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-16 w-full flex justify-between items-start px-4 pt-4 z-50">
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
    </div>
  );
}

export default AboutPage;
