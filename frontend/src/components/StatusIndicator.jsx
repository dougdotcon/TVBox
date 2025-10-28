import { Badge } from "./ui/Badge";

export default function StatusIndicator({ status = "offline" }) {
  const isOnline = status === "online";
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className={`h-4 w-4 rounded-full transition-all duration-300 ${
          isOnline
            ? "bg-green-400 shadow-lg shadow-green-400/50"
            : "bg-gray-500 shadow-lg shadow-gray-500/30"
        }`} />
        {isOnline && (
          <>
            <div className="absolute inset-0 h-4 w-4 rounded-full bg-green-400 animate-ping opacity-50" />
            <div className="absolute inset-0 h-4 w-4 rounded-full bg-green-400 status-pulse opacity-40" />
          </>
        )}
        {!isOnline && (
          <div className="absolute inset-0 h-4 w-4 rounded-full bg-gray-500 opacity-60" />
        )}
      </div>
      <Badge
        variant={isOnline ? "success" : "secondary"}
        className="font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full uppercase tracking-wider text-crisp"
      >
        {status}
      </Badge>
    </div>
  );
}

