export function Button({ 
  children, 
  variant = "default", 
  size = "default",
  className = "", 
  ...props 
}) {
  const variants = {
    default: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 border border-green-500/30",
    outline: "border-2 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 text-gray-300 backdrop-blur-sm transition-all",
    ghost: "hover:bg-gray-800/50 text-gray-300 hover:text-white",
    link: "text-green-400 underline-offset-4 hover:underline hover:text-green-300",
    secondary: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-sm shadow-gray-900/50 hover:shadow-md border border-gray-700/50",
  };

  const sizes = {
    default: "h-10 px-4 py-2 rounded-lg text-sm font-semibold",
    sm: "h-9 px-3 text-xs rounded-lg font-semibold",
    lg: "h-12 px-8 text-base rounded-xl font-bold",
    icon: "h-10 w-10 rounded-lg",
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

