export function Separator({ orientation = "horizontal", className = "", ...props }) {
  const classes = orientation === "horizontal" 
    ? "h-px w-full bg-gradient-to-r from-transparent via-gray-700/60 to-transparent" 
    : "h-full w-px bg-gradient-to-b from-transparent via-gray-700/60 to-transparent";
  
  return <div className={`shrink-0 ${classes} ${className}`} {...props} />;
}

