import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Separator } from "./ui/Separator";
import StatusIndicator from "./StatusIndicator";

export default function TVBoxCard({ box }) {
  const isOnline = box.status === "online";
  
  return (
    <Link to={`/tvbox/${box.id}`} className="block h-full card-hover-effect">
      <Card className={`h-full card-enhanced transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border relative overflow-hidden group ${
        isOnline
          ? `border-green-500/30 hover:border-green-500/50 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-green-950/25 hover:shadow-green-500/25`
          : `border-gray-700/40 hover:border-gray-600/50 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-gray-950/25`
      }`}>
        {isOnline && (
          <>
            <div className="absolute top-0 right-0 w-44 h-44 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-green-500/8 rounded-full blur-2xl group-hover:bg-green-500/15 transition-all duration-700" />
          </>
        )}
        
        <CardHeader className="pb-4 relative z-10 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight text-crisp leading-tight">
              {box.name}
            </CardTitle>
            <StatusIndicator status={box.status} />
          </div>
        </CardHeader>
        
        <CardContent className="p-5 sm:p-6 pt-0 space-y-4 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-gray-800/60 hover:border-green-500/40 transition-all duration-300 group/item hover:bg-black/50">
              <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider text-crisp">Usuários</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-green-400 drop-shadow-xl text-crisp tracking-tight">
                {box.users}
              </p>
            </div>
            
            <div className="space-y-2 bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-gray-800/60 hover:border-blue-500/40 transition-all duration-300 group/item hover:bg-black/50">
              <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider text-crisp">CPU</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-400 drop-shadow-xl text-crisp tracking-tight">
                {box.cpu}
              </p>
            </div>
          </div>

          <Separator className="opacity-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          <div className="space-y-2 bg-black/40 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-gray-800/60 hover:border-purple-500/40 transition-all duration-300 hover:bg-black/50">
            <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider text-crisp">Memória</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-400 drop-shadow-xl text-crisp tracking-tight">
              {box.memory}
            </p>
          </div>

          {box.ip !== '—' && (
            <div className="text-sm sm:text-base text-gray-400 font-mono bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl px-4 py-3 text-center font-medium tracking-wide">
              {box.ip}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
