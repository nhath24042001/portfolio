import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Gallery - Nhật Huy",
  description: "Explore my portfolio of web applications, mobile apps, and innovative projects showcasing full-stack development skills",
  keywords: ["Projects", "Portfolio", "Web Development", "Mobile Apps", "Full Stack", "React", "Next.js", "Projects Gallery"],
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsGallery />
    </>
  );
}

