import { Skills } from "@/components/sections/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Expertise - Nhật Huy",
  description: "Technical skills, expertise, and professional competencies of Nhật Huy - Full Stack Developer",
  keywords: ["Skills", "Expertise", "Technical Skills", "Programming", "Web Development", "Frontend", "Backend", "Full Stack"],
};

export default function SkillsPage() {
  return (
    <>
      <Skills />
    </>
  );
}
