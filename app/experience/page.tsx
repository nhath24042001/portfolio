import { Experience } from "@/components/sections/Experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience - Nhật Huy",
  description: "Professional experience and career journey of Nhật Huy - Full Stack Developer",
  keywords: ["Experience", "Career", "Work History", "Professional Background", "Software Development"],
};

export default function ExperiencePage() {
  return (
    <>
      <Experience />
    </>
  );
}
