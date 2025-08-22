"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere, Cylinder, Environment, Float, PresentationControls } from "@react-three/drei";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  Timer, 
  Trophy, 
  Gamepad2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Info,
  Sparkles,
  Crown,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";
import * as THREE from "three";

interface Move {
  from: string;
  to: string;
  piece: string;
  captured?: string;
  isCheck?: boolean;
  isCheckmate?: boolean;
  isCastling?: boolean;
  isEnPassant?: boolean;
}

// 3D Chess Piece Component
function ChessPiece({ 
  piece, 
  position, 
  isSelected, 
  isValidMove, 
  onClick, 
  onHover 
}: {
  piece: string;
  position: [number, number, number];
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
  onHover: (hovering: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Rotation animation
      if (isSelected) {
        meshRef.current.rotation.y += 0.02;
      }
    }
  });

    const getPieceGeometry = (pieceType: string) => {

    switch (pieceType) {
      case 'pawn':
        return (
          <group>
            {/* Pawn base */}
            <mesh position={[0, -0.3, 0]}>
              <Cylinder args={[0.25, 0.3, 0.1, 12]} />
              {baseMaterial}
            </mesh>
            {/* Pawn body */}
            <mesh position={[0, -0.1, 0]}>
              <Cylinder args={[0.18, 0.22, 0.4, 12]} />
              {baseMaterial}
            </mesh>
            {/* Pawn head */}
            <mesh position={[0, 0.2, 0]}>
              <Sphere args={[0.15, 12, 8]} />
              {baseMaterial}
            </mesh>
          </group>
        );
      
      case 'rook':
        return (
          <group>
            {/* Rook base */}
            <mesh position={[0, -0.35, 0]}>
              <Cylinder args={[0.35, 0.4, 0.15, 8]} />
              {baseMaterial}
            </mesh>
            {/* Rook body */}
            <mesh position={[0, -0.05, 0]}>
              <Cylinder args={[0.28, 0.32, 0.45, 8]} />
              {baseMaterial}
            </mesh>
            {/* Rook top */}
            <mesh position={[0, 0.25, 0]}>
              <Cylinder args={[0.3, 0.3, 0.2, 8]} />
              {baseMaterial}
            </mesh>
            {/* Battlements */}
            <mesh position={[0.2, 0.4, 0]}>
              <Box args={[0.08, 0.15, 0.08]} />
              {baseMaterial}
            </mesh>
            <mesh position={[-0.2, 0.4, 0]}>
              <Box args={[0.08, 0.15, 0.08]} />
              {baseMaterial}
            </mesh>
            <mesh position={[0, 0.4, 0.2]}>
              <Box args={[0.08, 0.15, 0.08]} />
              {baseMaterial}
            </mesh>
            <mesh position={[0, 0.4, -0.2]}>
              <Box args={[0.08, 0.15, 0.08]} />
              {baseMaterial}
            </mesh>
          </group>
        );
      
      case 'knight':
        return (
          <group>
            {/* Knight base */}
            <mesh position={[0, -0.3, 0]}>
              <Cylinder args={[0.3, 0.35, 0.15, 12]} />
              {baseMaterial}
            </mesh>
            {/* Knight body */}
            <mesh position={[0, -0.05, 0]}>
              <Cylinder args={[0.22, 0.28, 0.4, 12]} />
              {baseMaterial}
            </mesh>
            {/* Horse head */}
            <mesh position={[0.1, 0.2, 0.15]} rotation={[0, 0.3, 0.2]}>
              <Box args={[0.3, 0.4, 0.2]} />
              {baseMaterial}
            </mesh>
            {/* Horse nose */}
            <mesh position={[0.25, 0.1, 0.2]} rotation={[0, 0.3, 0]}>
              <Box args={[0.15, 0.15, 0.12]} />
              {baseMaterial}
            </mesh>
            {/* Horse ears */}
            <mesh position={[0.05, 0.35, 0.1]}>
              <Cylinder args={[0.03, 0.05, 0.12, 6]} />
              {baseMaterial}
            </mesh>
            <mesh position={[0.15, 0.35, 0.2]}>
              <Cylinder args={[0.03, 0.05, 0.12, 6]} />
              {baseMaterial}
            </mesh>
          </group>
        );
      
      case 'bishop':
        return (
          <group>
            {/* Bishop base */}
            <mesh position={[0, -0.35, 0]}>
              <Cylinder args={[0.3, 0.35, 0.15, 12]} />
              {baseMaterial}
            </mesh>
            {/* Bishop body */}
            <mesh position={[0, -0.1, 0]}>
              <Cylinder args={[0.2, 0.28, 0.4, 12]} />
              {baseMaterial}
            </mesh>
            {/* Bishop hat */}
            <mesh position={[0, 0.15, 0]}>
              <Cylinder args={[0.05, 0.22, 0.35, 12]} />
              {baseMaterial}
            </mesh>
            {/* Bishop top */}
            <mesh position={[0, 0.38, 0]}>
              <Sphere args={[0.08, 8, 6]} />
              {baseMaterial}
            </mesh>
            {/* Bishop cross */}
            <mesh position={[0, 0.5, 0]}>
              <Box args={[0.03, 0.15, 0.03]} />
              {gemMaterial}
            </mesh>
            <mesh position={[0, 0.52, 0]}>
              <Box args={[0.08, 0.03, 0.03]} />
              {gemMaterial}
            </mesh>
          </group>
        );
      
      case 'queen':
        return (
          <group>
            {/* Queen base */}
            <mesh position={[0, -0.35, 0]}>
              <Cylinder args={[0.35, 0.4, 0.15, 12]} />
              {baseMaterial}
            </mesh>
            {/* Queen body */}
            <mesh position={[0, -0.05, 0]}>
              <Cylinder args={[0.25, 0.32, 0.45, 12]} />
              {baseMaterial}
            </mesh>
            {/* Queen waist */}
            <mesh position={[0, 0.25, 0]}>
              <Cylinder args={[0.18, 0.22, 0.15, 12]} />
              {baseMaterial}
            </mesh>
            {/* Queen crown base */}
            <mesh position={[0, 0.4, 0]}>
              <Cylinder args={[0.25, 0.25, 0.1, 12]} />
              {baseMaterial}
            </mesh>
            {/* Crown spikes */}
            <mesh position={[0, 0.55, 0]}>
              <Cylinder args={[0.02, 0.04, 0.2, 8]} />
              {baseMaterial}
            </mesh>
            <mesh position={[0.15, 0.5, 0]}>
              <Cylinder args={[0.02, 0.04, 0.15, 8]} />
              {baseMaterial}
            </mesh>
            <mesh position={[-0.15, 0.5, 0]}>
              <Cylinder args={[0.02, 0.04, 0.15, 8]} />
              {baseMaterial}
            </mesh>
            <mesh position={[0, 0.5, 0.15]}>
              <Cylinder args={[0.02, 0.04, 0.15, 8]} />
              {baseMaterial}
            </mesh>
            <mesh position={[0, 0.5, -0.15]}>
              <Cylinder args={[0.02, 0.04, 0.15, 8]} />
              {baseMaterial}
            </mesh>
            {/* Crown gems */}
            <mesh position={[0, 0.6, 0]}>
              <Sphere args={[0.04, 8, 6]} />
              {gemMaterial}
            </mesh>
          </group>
        );
      
      case 'king':
        return (
          <group>
            {/* King base */}
            <mesh position={[0, -0.35, 0]}>
              <Cylinder args={[0.35, 0.4, 0.15, 12]} />
              {baseMaterial}
            </mesh>
            {/* King body */}
            <mesh position={[0, -0.05, 0]}>
              <Cylinder args={[0.25, 0.32, 0.45, 12]} />
              {baseMaterial}
            </mesh>
            {/* King waist */}
            <mesh position={[0, 0.25, 0]}>
              <Cylinder args={[0.2, 0.24, 0.15, 12]} />
              {baseMaterial}
            </mesh>
            {/* King crown base */}
            <mesh position={[0, 0.4, 0]}>
              <Cylinder args={[0.28, 0.28, 0.12, 12]} />
              {baseMaterial}
            </mesh>
            {/* Crown band */}
            <mesh position={[0, 0.48, 0]}>
              <Cylinder args={[0.3, 0.3, 0.05, 12]} />
              {baseMaterial}
            </mesh>
            {/* Crown cross */}
            <mesh position={[0, 0.6, 0]}>
              <Box args={[0.04, 0.2, 0.04]} />
              {gemMaterial}
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <Box args={[0.12, 0.04, 0.04]} />
              {gemMaterial}
            </mesh>
            {/* Crown jewels */}
            <mesh position={[0.2, 0.52, 0]}>
              <Sphere args={[0.03, 6, 4]} />
              {gemMaterial}
            </mesh>
            <mesh position={[-0.2, 0.52, 0]}>
              <Sphere args={[0.03, 6, 4]} />
              {gemMaterial}
            </mesh>
            <mesh position={[0, 0.52, 0.2]}>
              <Sphere args={[0.03, 6, 4]} />
              {gemMaterial}
            </mesh>
            <mesh position={[0, 0.52, -0.2]}>
              <Sphere args={[0.03, 6, 4]} />
              {gemMaterial}
            </mesh>
          </group>
        );
      
      default:
        return <Box args={[0.5, 0.5, 0.5]} />;
    }
  };

  const getPieceColor = (color: string) => {
    return color === 'white' ? '#f0f8ff' : '#1a1a1a';
  };

  const getGemColor = (pieceType: string) => {
    switch (pieceType) {
      case 'king':
        return '#ffd700'; // Gold
      case 'queen':
        return '#ff1493'; // Deep pink
      case 'bishop':
        return '#9370db'; // Medium purple
      default:
        return '#87ceeb'; // Sky blue
    }
  };

  const [color, pieceType] = piece.split('-');
  const pieceColor = getPieceColor(color);

  const baseMaterial = (
    <meshStandardMaterial 
      color={pieceColor}
      metalness={color === 'white' ? 0.05 : 0.2}
      roughness={color === 'white' ? 0.9 : 0.7}
      emissive={isSelected ? '#4a90e2' : '#000000'}
      emissiveIntensity={isSelected ? 0.3 : 0}
    />
  );

  const gemMaterial = (
    <meshStandardMaterial 
      color={getGemColor(pieceType)}
      metalness={0.8}
      roughness={0.1}
      emissive={isSelected ? '#4a90e2' : getGemColor(pieceType)}
      emissiveIntensity={isSelected ? 0.3 : 0.2}
    />
  );

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
             <group
         ref={meshRef}
         position={position}
         onClick={onClick}
         onPointerOver={() => {
           setHovered(true);
           onHover(true);
         }}
         onPointerOut={() => {
           setHovered(false);
           onHover(false);
         }}
         scale={hovered || isSelected ? 1.3 : 1}
       >
         {/* Outline for better visibility */}
         <mesh position={[0, 0, 0.01]} scale={1.05}>
           <Cylinder args={[0.4, 0.4, 1.2, 12]} />
           <meshBasicMaterial color="#000000" transparent opacity={0.3} />
         </mesh>
        {getPieceGeometry(pieceType)}
      </group>
      
             {/* Piece label */}
       <Text
         position={[position[0], position[1] + 0.8, position[2]]}
         fontSize={0.15}
         color={color === 'white' ? '#000000' : '#ffffff'}
         anchorX="center"
         anchorY="middle"
         outlineWidth={0.02}
         outlineColor="#000000"
       >
         {pieceType.charAt(0).toUpperCase()}
       </Text>
    </Float>
  );
}

// 3D Chess Board Component
function ChessBoard({ 
  board, 
  selectedPiece, 
  validMoves, 
  onSquareClick 
}: {
  board: string[][];
  selectedPiece: string | null;
  validMoves: string[];
  onSquareClick: (row: number, col: number) => void;
}) {
  const squares = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0;
      const position = `${String.fromCharCode(97 + col)}${8 - row}`;
      const isSelected = selectedPiece === position;
      const isValidMove = validMoves.includes(position);
      const piece = board[row][col];
      
      squares.push(
        <group key={`${row}-${col}`}>
          {/* Square */}
          <mesh
            position={[col - 3.5, 0, row - 3.5]}
            onClick={() => onSquareClick(row, col)}
          >
            <Box args={[1, 0.1, 1]} />
                         <meshStandardMaterial 
               color={isLight ? '#e6d7c3' : '#5d4037'}
               roughness={0.9}
               metalness={0.05}
             />
          </mesh>
          
          {/* Valid move indicator */}
          {isValidMove && !piece && (
            <mesh position={[col - 3.5, 0.06, row - 3.5]}>
              <Sphere args={[0.2, 8, 8]} />
              <meshStandardMaterial 
                color="#4ade80"
                transparent
                opacity={0.6}
                emissive="#4ade80"
                emissiveIntensity={0.3}
              />
            </mesh>
          )}
          
          {/* Piece */}
          {piece && (
            <ChessPiece
              piece={piece}
              position={[col - 3.5, 0.5, row - 3.5]}
              isSelected={isSelected}
              isValidMove={isValidMove}
              onClick={() => onSquareClick(row, col)}
              onHover={() => {}}
            />
          )}
        </group>
      );
    }
  }
  
  return <>{squares}</>;
}

// 3D Scene Component
function ChessScene({ 
  board, 
  selectedPiece, 
  validMoves, 
  onSquareClick 
}: {
  board: string[][];
  selectedPiece: string | null;
  validMoves: string[];
  onSquareClick: (row: number, col: number) => void;
}) {
  return (
    <>
             {/* Lighting */}
       <ambientLight intensity={1.0} />
       <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
       <directionalLight position={[-10, 10, -5]} intensity={1.5} />
       <pointLight position={[0, 8, 0]} intensity={0.8} color="#ffffff" />
       <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
       <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ffffff" />
      
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Chess Board */}
      <ChessBoard 
        board={board}
        selectedPiece={selectedPiece}
        validMoves={validMoves}
        onSquareClick={onSquareClick}
      />
      

      
      {/* Board Base */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <Box args={[10, 0.2, 10]} />
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </mesh>
    </>
  );
}

export function ChessGame3D() {
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [gameHistory, setGameHistory] = useState<Move[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'check' | 'checkmate' | 'stalemate'>('playing');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState({ white: 300, black: 300 });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [show3D, setShow3D] = useState(true);

  // Initialize chess board
  const initializeBoard = () => {
    const initialBoard = Array(8).fill(null).map(() => Array(8).fill(''));
    
    const setup = {
      black: {
        rook: ['a8', 'h8'],
        knight: ['b8', 'g8'],
        bishop: ['c8', 'f8'],
        queen: ['d8'],
        king: ['e8'],
        pawn: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
      },
      white: {
        rook: ['a1', 'h1'],
        knight: ['b1', 'g1'],
        bishop: ['c1', 'f1'],
        queen: ['d1'],
        king: ['e1'],
        pawn: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']
      }
    };

    Object.entries(setup).forEach(([color, pieces]) => {
      Object.entries(pieces).forEach(([pieceType, positions]) => {
        positions.forEach(pos => {
          const [file, rank] = pos.split('');
          const fileIndex = file.charCodeAt(0) - 97;
          const rankIndex = 8 - parseInt(rank);
          initialBoard[rankIndex][fileIndex] = `${color}-${pieceType}`;
        });
      });
    });

    return initialBoard;
  };

  // Convert position to coordinates
  const positionToCoords = (position: string) => {
    const file = position.charCodeAt(0) - 97;
    const rank = 8 - parseInt(position[1]);
    return { row: rank, col: file };
  };

  // Convert coordinates to position
  const coordsToPosition = (row: number, col: number) => {
    const file = String.fromCharCode(97 + col);
    const rank = 8 - row;
    return `${file}${rank}`;
  };

  // Get valid moves for a piece
  const getValidMoves = (row: number, col: number): string[] => {
    const piece = board[row][col];
    if (!piece) return [];

    const moves: string[] = [];
    const [color, pieceType] = piece.split('-');

    switch (pieceType) {
      case 'pawn':
        const direction = color === 'white' ? -1 : 1;
        const startRank = color === 'white' ? 6 : 1;
        
        if (row + direction >= 0 && row + direction < 8 && !board[row + direction][col]) {
          moves.push(coordsToPosition(row + direction, col));
          
          if (row === startRank && !board[row + 2 * direction][col]) {
            moves.push(coordsToPosition(row + 2 * direction, col));
          }
        }
        
        [-1, 1].forEach(fileOffset => {
          const newCol = col + fileOffset;
          if (newCol >= 0 && newCol < 8 && row + direction >= 0 && row + direction < 8) {
            const targetPiece = board[row + direction][newCol];
            if (targetPiece && targetPiece.split('-')[0] !== color) {
              moves.push(coordsToPosition(row + direction, newCol));
            }
          }
        });
        break;

      case 'rook':
        const rookDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        rookDirections.forEach(([dRow, dCol]) => {
          let newRow = row + dRow;
          let newCol = col + dCol;
          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece) {
              moves.push(coordsToPosition(newRow, newCol));
            } else {
              if (targetPiece.split('-')[0] !== color) {
                moves.push(coordsToPosition(newRow, newCol));
              }
              break;
            }
            newRow += dRow;
            newCol += dCol;
          }
        });
        break;

      case 'knight':
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        knightMoves.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece || targetPiece.split('-')[0] !== color) {
              moves.push(coordsToPosition(newRow, newCol));
            }
          }
        });
        break;

      case 'bishop':
        const bishopDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        bishopDirections.forEach(([dRow, dCol]) => {
          let newRow = row + dRow;
          let newCol = col + dCol;
          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece) {
              moves.push(coordsToPosition(newRow, newCol));
            } else {
              if (targetPiece.split('-')[0] !== color) {
                moves.push(coordsToPosition(newRow, newCol));
              }
              break;
            }
            newRow += dRow;
            newCol += dCol;
          }
        });
        break;

      case 'queen':
        const queenDirections = [
          [0, 1], [0, -1], [1, 0], [-1, 0],
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        queenDirections.forEach(([dRow, dCol]) => {
          let newRow = row + dRow;
          let newCol = col + dCol;
          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece) {
              moves.push(coordsToPosition(newRow, newCol));
            } else {
              if (targetPiece.split('-')[0] !== color) {
                moves.push(coordsToPosition(newRow, newCol));
              }
              break;
            }
            newRow += dRow;
            newCol += dCol;
          }
        });
        break;

      case 'king':
        const kingDirections = [
          [0, 1], [0, -1], [1, 0], [-1, 0],
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        kingDirections.forEach(([dRow, dCol]) => {
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece || targetPiece.split('-')[0] !== color) {
              moves.push(coordsToPosition(newRow, newCol));
            }
          }
        });
        break;
    }

    return moves;
  };

  // Handle piece selection
  const handlePieceClick = (row: number, col: number) => {
    const piece = board[row][col];
    const position = coordsToPosition(row, col);

    if (selectedPiece === position) {
      setSelectedPiece(null);
      setValidMoves([]);
    } else if (piece && piece.split('-')[0] === currentPlayer) {
      setSelectedPiece(position);
      const moves = getValidMoves(row, col);
      setValidMoves(moves);
    } else if (selectedPiece && validMoves.includes(position)) {
      makeMove(selectedPiece, position);
    }
  };

  // Make a move
  const makeMove = (from: string, to: string) => {
    const fromCoords = positionToCoords(from);
    const toCoords = positionToCoords(to);
    
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[fromCoords.row][fromCoords.col];
    const capturedPiece = newBoard[toCoords.row][toCoords.col];
    
    newBoard[toCoords.row][toCoords.col] = piece;
    newBoard[fromCoords.row][fromCoords.col] = '';
    
    setBoard(newBoard);
    setSelectedPiece(null);
    setValidMoves([]);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    
    const move: Move = {
      from,
      to,
      piece,
      captured: capturedPiece || undefined
    };
    setGameHistory([...gameHistory, move]);
    
    const [color, pieceType] = piece.split('-');
    if (pieceType === 'pawn' && (toCoords.row === 0 || toCoords.row === 7)) {
      newBoard[toCoords.row][toCoords.col] = `${color}-queen`;
      setBoard(newBoard);
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(initializeBoard());
    setSelectedPiece(null);
    setValidMoves([]);
    setCurrentPlayer('white');
    setGameHistory([]);
    setGameStatus('playing');
    setIsGameStarted(false);
    setIsTimerRunning(false);
    setTimer({ white: 300, black: 300 });
  };

  // Start game
  const startGame = () => {
    setIsGameStarted(true);
    setIsTimerRunning(true);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && isGameStarted) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          [currentPlayer]: Math.max(0, prev[currentPlayer] - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isGameStarted, currentPlayer]);

  // Check for game end
  useEffect(() => {
    if (timer.white === 0 || timer.black === 0) {
      setGameStatus('checkmate');
      setIsTimerRunning(false);
    }
  }, [timer]);

  // Initialize board on mount
  useEffect(() => {
    const initialBoard = initializeBoard();
    console.log('Initial board:', initialBoard);
    setBoard(initialBoard);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Container className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with 3D Effects */}
          <motion.div
            className="text-center space-y-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full text-sm font-medium text-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Real 3D Chess Experience
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Chess
              </span>
              <span className="text-white"> in 3D</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience chess like never before with true 3D graphics powered by Three.js. 
              Every piece is a real 3D object with physics and lighting!
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Game Controls - 3D Styled */}
            <div className="xl:col-span-1 space-y-6">
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-white">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  Game Controls
                </h3>

                <div className="space-y-4">
                  {!isGameStarted ? (
                    <Button 
                      onClick={startGame} 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                      size="lg"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Start 3D Adventure
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)} 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                      size="lg"
                    >
                      {isTimerRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                      {isTimerRunning ? 'Pause Battle' : 'Resume Battle'}
                    </Button>
                  )}

                  <Button 
                    onClick={resetGame} 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    New Game
                  </Button>

                  <Button 
                    onClick={() => setShow3D(!show3D)} 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    {show3D ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                    {show3D ? 'Hide 3D' : 'Show 3D'}
                  </Button>

                  <Button 
                    onClick={() => setIsSoundOn(!isSoundOn)} 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    {isSoundOn ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                    {isSoundOn ? 'Sound On' : 'Sound Off'}
                  </Button>

                  <Button 
                    onClick={() => setShowInstructions(!showInstructions)} 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    How to Play
                  </Button>
                </div>
              </motion.div>

              {/* Game Info - 3D Styled */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-white">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  Battle Status
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Current Player:</span>
                    <Badge className={`${currentPlayer === 'white' ? 'bg-gradient-to-r from-white to-gray-200 text-black' : 'bg-gradient-to-r from-gray-800 to-black text-white'}`}>
                      {currentPlayer === 'white' ? '♔ White' : '♚ Black'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Game Status:</span>
                    <Badge className={gameStatus === 'playing' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'}>
                      {gameStatus === 'playing' ? '⚔️ Fighting' : '🏁 Game Over'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Moves Made:</span>
                    <span className="font-bold text-white text-lg">{gameHistory.length}</span>
                  </div>
                </div>
              </motion.div>

              {/* Timers - 3D Styled */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-white">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                    <Timer className="h-5 w-5 text-white" />
                  </div>
                  Time Remaining
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">White:</span>
                    <span className={`font-mono font-bold text-lg ${timer.white === 0 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(timer.white)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Black:</span>
                    <span className={`font-mono font-bold text-lg ${timer.black === 0 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(timer.black)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 3D Chess Board */}
            <motion.div
              className="xl:col-span-3 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl w-full h-[600px]">
                {show3D ? (
                  <div className="relative w-full h-full">
                    <Canvas
                      camera={{ position: [0, 10, 10], fov: 45 }}
                      shadows
                      className="w-full h-full rounded-2xl"
                    >
                      <Suspense fallback={null}>
                        <PresentationControls
                          global
                          rotation={[0, -Math.PI / 4, 0]}
                          polar={[-Math.PI / 4, Math.PI / 4]}
                          azimuth={[-Math.PI / 4, Math.PI / 4]}
                        >
                          <ChessScene 
                            board={board}
                            selectedPiece={selectedPiece}
                            validMoves={validMoves}
                            onSquareClick={handlePieceClick}
                          />
                        </PresentationControls>
                      </Suspense>
                    </Canvas>
                    
                    {/* Debug Info */}
                    <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-xs z-10">
                      <div>Board Pieces: {board.flat().filter(p => p).length}</div>
                      <div>Selected: {selectedPiece || 'None'}</div>
                      <div>Valid Moves: {validMoves.length}</div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <EyeOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-xl">3D View Disabled</p>
                      <p className="text-gray-400">Click &quot;Show 3D&quot; to enable</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Instructions Modal */}
          <AnimatePresence>
            {showInstructions && (
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                    <Crown className="h-6 w-6 text-yellow-400" />
                    How to Play 3D Chess
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      Click on 3D pieces to select them
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-400" />
                      Valid moves show green spheres
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-400" />
                      Drag to rotate the 3D view
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-400" />
                      Zoom with mouse wheel
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-pink-400" />
                      White moves first
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-indigo-400" />
                      Each player has 5 minutes
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowInstructions(false)} 
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                    Let&apos;s Play in 3D!
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
