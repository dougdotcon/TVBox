export function Badge({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-green-500 text-white shadow-md shadow-green-500/30",
    secondary: "bg-gray-800/60 text-gray-400 border border-gray-700/60 backdrop-blur-sm",
    outline: "border border-gray-600 text-gray-300 hover:border-gray-500",
    success: "bg-green-500/20 text-green-400 border border-green-500/40 shadow-sm shadow-green-500/20 backdrop-blur-sm",
    danger: "bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm shadow-red-500/20 backdrop-blur-sm",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 shadow-sm shadow-yellow-500/20 backdrop-blur-sm",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 uppercase tracking-wide ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

