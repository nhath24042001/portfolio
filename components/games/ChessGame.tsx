"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap
} from "lucide-react";

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

export function ChessGame() {
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
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

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

  // Get piece symbol with 3D styling
  const getPieceSymbol = (piece: string) => {
    if (!piece) return '';
    
    const symbols = {
      'white-pawn': '♙',
      'white-rook': '♖',
      'white-knight': '♘',
      'white-bishop': '♗',
      'white-queen': '♕',
      'white-king': '♔',
      'black-pawn': '♟',
      'black-rook': '♜',
      'black-knight': '♞',
      'black-bishop': '♝',
      'black-queen': '♛',
      'black-king': '♚'
    };
    
    return symbols[piece as keyof typeof symbols] || '';
  };

  // Get 3D square styling
  const getSquareStyle = (row: number, col: number, isSelected: boolean, isValidMove: boolean) => {
    const isLight = (row + col) % 2 === 0;
    const baseColor = isLight ? 'bg-gradient-to-br from-amber-100 to-amber-200' : 'bg-gradient-to-br from-amber-800 to-amber-900';
    const darkBaseColor = isLight ? 'dark:from-amber-900 dark:to-amber-800' : 'dark:from-amber-200 dark:to-amber-100';
    
    let borderColor = 'border-transparent';
    let shadow = 'shadow-lg';
    let transform = '';

    if (isSelected) {
      borderColor = 'border-blue-500';
      shadow = 'shadow-2xl shadow-blue-500/50';
      transform = 'scale-105';
    } else if (isValidMove) {
      borderColor = 'border-green-500';
      shadow = 'shadow-xl shadow-green-500/30';
      transform = 'scale-102';
    } else if (hoveredSquare === coordsToPosition(row, col)) {
      shadow = 'shadow-xl';
      transform = 'scale-103';
    }

    return `${baseColor} ${darkBaseColor} ${borderColor} ${shadow} ${transform} transition-all duration-300`;
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
    setBoard(initializeBoard());
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
        <div className="max-w-6xl mx-auto">
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
                3D Chess Experience
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
              <span className="text-white"> Master</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Immerse yourself in a stunning 3D chess experience. 
              Every move feels magical with our enhanced visual effects and smooth animations.
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
                      Start Adventure
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
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="relative">
                  {/* 3D Board Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl transform -rotate-2 scale-105 opacity-30"></div>
                  
                  {/* Main Board */}
                  <div className="relative bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-800 dark:to-amber-600 rounded-2xl p-4 shadow-2xl">
                    <div className="grid grid-cols-8 gap-0">
                      {board.map((row, rowIndex) =>
                        row.map((piece, colIndex) => {
                          const position = coordsToPosition(rowIndex, colIndex);
                          const isSelected = selectedPiece === position;
                          const isValidMove = validMoves.includes(position);

                          return (
                            <motion.div
                              key={position}
                              className={`
                                w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl cursor-pointer
                                border-2 ${getSquareStyle(rowIndex, colIndex, isSelected, isValidMove)}
                                relative overflow-hidden
                              `}
                              onClick={() => handlePieceClick(rowIndex, colIndex)}
                              onMouseEnter={() => setHoveredSquare(position)}
                              onMouseLeave={() => setHoveredSquare(null)}
                              whileHover={{ 
                                scale: 1.1,
                                rotateY: 5,
                                rotateX: 5,
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {/* 3D Piece Effect */}
                              {piece && (
                                <motion.div
                                  className="relative"
                                  initial={{ scale: 0, rotateY: 180 }}
                                  animate={{ scale: 1, rotateY: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <motion.span
                                    className={`${piece.split('-')[0] === 'white' ? 'text-white drop-shadow-lg' : 'text-black drop-shadow-lg'} relative z-10`}
                                    style={{
                                      textShadow: piece.split('-')[0] === 'white' 
                                        ? '2px 2px 4px rgba(0,0,0,0.5)' 
                                        : '2px 2px 4px rgba(255,255,255,0.5)'
                                    }}
                                  >
                                    {getPieceSymbol(piece)}
                                  </motion.span>
                                  {/* 3D Shadow */}
                                  <div className="absolute inset-0 bg-black/20 blur-sm transform translate-y-1"></div>
                                </motion.div>
                              )}
                              
                              {/* Valid Move Indicator */}
                              {isValidMove && !piece && (
                                <motion.div
                                  className="absolute inset-2 bg-green-500/60 rounded-full"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
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
                    How to Play
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      Click on a piece to select it
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-400" />
                      Valid moves will be highlighted
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-400" />
                      Click on a highlighted square to move
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-400" />
                      White moves first
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-pink-400" />
                      Each player has 5 minutes
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-indigo-400" />
                      Pawns promote to queens automatically
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowInstructions(false)} 
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                                         Let&apos;s Play!
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
