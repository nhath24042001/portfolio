import { ChessGame3D } from "@/components/games/ChessGame3D";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chess Game - Nhật Huy",
  description: "Play a quick game of chess while exploring my portfolio. Test your strategic thinking!",
  keywords: ["Chess", "Game", "Portfolio", "Interactive", "Strategy", "Fun"],
};

export default function GamePage() {
  return (
    <>
      <ChessGame3D />
    </>
  );
}
