import React from 'react';
import TVBoxCard from '../components/TVBoxCard';
import useTvboxSockets from '../services/useTvboxSockets';
import { tvboxes } from '../services/tvboxes';
import MetricCard from '../components/MetricCard';

export default function Dashboard() {
  const byId = useTvboxSockets();

  const onlineCount = tvboxes.filter((meta) => {
    const d = byId[meta.id];
    return d && !d.error;
  }).length;

  const totalCount = tvboxes.length;
  const offlineCount = totalCount - onlineCount;
  const uptimePercent = totalCount > 0 ? ((onlineCount / totalCount) * 100).toFixed(1) : 0;

  const totalUsers = tvboxes.reduce((acc, meta) => {
    const d = byId[meta.id];
    return acc + (d?.wsUsers ?? 0);
  }, 0);

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="max-w-8xl mx-auto space-y-12 sm:space-y-16">
          {/* Header Section */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black gradient-text text-center tracking-tight">
                  Monitoramento TVBox
                </h1>
                <p className="text-gray-400 text-base sm:text-lg lg:text-xl xl:text-2xl text-center max-w-4xl mx-auto font-light leading-relaxed">
                  Sistema avançado de gerenciamento e monitoramento em tempo real
                </p>
              </div>
              <div className="flex items-center gap-4 justify-center bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50">
                <div className={`h-3 w-3 rounded-full ${onlineCount > 0 ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'}`} />
                <span className="text-sm sm:text-base font-semibold text-white">Sistema Online</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <MetricCard
                title="TVBoxes Online"
                value={onlineCount}
                description={`de ${totalCount} disp.`}
                className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/40"
              />
              <MetricCard
                title="TVBoxes Offline"
                value={offlineCount}
                description="dispositivos"
                className="border-gray-700/20 bg-gradient-to-br from-gray-800/5 to-transparent hover:border-gray-700/40"
              />
              <MetricCard
                title="Uptime"
                value={`${uptimePercent}%`}
                description="disponibilidade"
                className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent hover:border-blue-500/40"
              />
              <MetricCard
                title="Usuários Ativos"
                value={totalUsers}
                description="conectados"
                className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent hover:border-yellow-500/40"
              />
            </div>
          </div>

          {/* Devices Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Dispositivos
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light">
                  Gerencie e monitore suas TVBoxes em tempo real
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-gray-300 bg-gray-900/70 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700/50 shadow-lg">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50"></div>
                <span className="font-medium">{new Date().toLocaleTimeString('pt-BR')}</span>
              </div>
            </div>

            {/* Devices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
              {tvboxes.map((meta, index) => {
                const d = byId[meta.id];         
                const online = d && !d.error;
                const cpuText = (typeof d?.cpuPercent === 'number')
                ? `${d.cpuPercent.toFixed(1)}%`
                : (Array.isArray(d?.cpuLoad) && d.cpuLoad.length > 0)
                  ? `${(d.cpuLoad[0] * 100).toFixed(1)}%`
                  : '—';
                const memText = d?.mem
                  ? `${(((d.mem.total - d.mem.free) / 1024) / 1024).toFixed(0)}MB`
                  : '—';

                return (
                  <div 
                    key={meta.id} 
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }} 
                    className="animate-fade-in"
                  >
                    <TVBoxCard
                      box={{
                        id: meta.id,
                        name: meta.name,
                        status: online ? 'online' : 'offline',
                        users: d?.wsUsers ?? 0,
                        cpu: cpuText,
                        memory: memText,
                        ip: d?.ip ?? '—',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
