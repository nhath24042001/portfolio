import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessMessageProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export function SuccessMessage({ title, message, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border border-border rounded-lg p-6 max-w-md mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
