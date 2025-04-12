import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isActive: boolean;
  loadingText: string;
  notLoadingText: string;
  color: "blue" | "red";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  isLoading,
  isActive,
  loadingText,
  notLoadingText,
  color,
}) => {
  const baseClass = "min-w-36 px-6 py-3 text-white rounded-md transition-colors";
  const colorClass = color === "blue" 
    ? "bg-blue-600 hover:bg-blue-700" 
    : "bg-red-600 hover:bg-red-700";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${colorClass}`}
      disabled={isLoading}
    >
      {isActive ? loadingText : notLoadingText}
    </button>
  );
};

export default ActionButton;