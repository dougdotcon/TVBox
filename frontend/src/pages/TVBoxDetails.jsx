import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tvboxes } from "../services/tvboxes";
import { io } from "socket.io-client";
import { getStatus } from "../services/api";
import TimeSeriesChart from "../components/TimeSeriesChart";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Separator } from "../components/ui/Separator";
import StatusIndicator from "../components/StatusIndicator";
import MetricCard from "../components/MetricCard";

function fmtUptime(sec = 0) {
  const s = Math.floor(sec), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
}
function fmtMemMB(total, free) {
  if (!total || free == null) return "—";
  const used = (total - free) / (1024 * 1024);
  return `${used.toFixed(0)}MB`;
}

function cpuPercentFromPayload(p) {
  if (typeof p?.cpuPercent === "number") return p.cpuPercent;
  const cores = p?.cores || 4;
  const l1 = Array.isArray(p?.cpuLoad) ? p.cpuLoad[0] : 0;
  const pct = (l1 / cores) * 100;
  return Math.max(0, Math.min(100, pct));
}
function memPercentFromPayload(p) {
  if (typeof p?.mem?.usedPercent === "number") return p.mem.usedPercent;
  if (p?.mem?.total && p?.mem?.free != null) {
    return ((p.mem.total - p.mem.free) / p.mem.total) * 100;
  }
  return 0;
}

export default function TVBoxDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const meta = useMemo(() => tvboxes.find(b => String(b.id) === String(id)), [id]);

  const [status,   setStatus]   = useState(null);
  const [online,   setOnline]   = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [cpuSeries, setCpuSeries] = useState([]);
  const [ramSeries, setRamSeries] = useState([]);
  const socketRef = useRef(null);
  const MAX_POINTS = 60;

  useEffect(() => {
    if (!meta) return;
    const ac = new AbortController();
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getStatus(meta.baseUrl, { instant: true, signal: ac.signal });

        if (!mounted) return;
        setStatus(data);
        setOnline(true);

        const t = new Date().toLocaleTimeString();
        const cpuV = cpuPercentFromPayload(data);
        const ramV = memPercentFromPayload(data);
        setCpuSeries([{ t, v: cpuV }]);
        setRamSeries([{ t, v: ramV }]);
      } catch {
        if (!mounted) return;
        setOnline(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      ac.abort();
    };
  }, [meta]);

  useEffect(() => {
    if (!meta) return;
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    const s = io(meta.baseUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      query: { role: "admin" },                 
    });
    socketRef.current = s;

    s.on("connect", () => setOnline(true));
    s.on("disconnect", () => setOnline(false));
    s.on("metrics", (payload) => {
      setStatus(payload);
      setOnline(true);

      const t = new Date().toLocaleTimeString();
      const cpuV = cpuPercentFromPayload(payload);
      const ramV = memPercentFromPayload(payload);

      setCpuSeries(prev => {
        const next = [...prev, { t, v: cpuV }];
        return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next;
      });
      setRamSeries(prev => {
        const next = [...prev, { t, v: ramV }];
        return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next;
      });
    });
    s.on("connect_error", () => setOnline(false));

    return () => {
      s.close();
      socketRef.current = null;
    };
  }, [meta]);

  if (!meta) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="max-w-lg mx-auto card-enhanced">
          <CardHeader className="text-center space-y-4 p-8 sm:p-10">
            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-crisp tracking-tight">
              TVBox não encontrada
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl text-gray-400 font-light">
              O dispositivo solicitado não existe ou foi removido do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-8 sm:p-10 pt-0">
            <Button
              onClick={() => navigate("/")}
              className="px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-200"
            >
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cpuPercent = cpuPercentFromPayload(status);
  const memPercent = memPercentFromPayload(status);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="space-y-10 sm:space-y-12">
          {/* Header Navigation */}
          <div className="flex items-center justify-between animate-fade-in">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 px-6 py-3 text-base font-semibold hover:scale-105 transition-all duration-200"
            >
              <span className="text-xl">←</span>
              <span>Voltar</span>
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-base text-gray-300 bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700/50 shadow-lg">
                ID: <span className="font-mono text-green-400 font-bold text-lg">{meta.id}</span>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className={`card-enhanced border-2 relative overflow-hidden ${
            online
              ? "border-green-500/40 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-green-950/30 shadow-2xl shadow-green-500/10"
              : "border-gray-700/50 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-gray-950/30"
          }`}>
            {online && (
              <>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/6 rounded-full blur-3xl pointer-events-none" />
              </>
            )}
            
            {/* Card Header */}
            <CardHeader className="relative z-10 pb-8 p-8 sm:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="space-y-4">
                  <CardTitle className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white text-crisp tracking-tight">
                    {status?.name || meta.name}
                  </CardTitle>
                  <CardDescription className="text-lg md:text-xl lg:text-2xl flex items-center gap-3 text-gray-300 font-light">
                    <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                    Monitoramento em tempo real
                  </CardDescription>
                </div>
                <div className="flex-shrink-0">
                  <StatusIndicator status={online ? "online" : "offline"} />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-10 sm:space-y-12 relative z-10 p-8 sm:p-10">
              {loading ? (
                <div className="text-center py-24 sm:py-32">
                  <div className="inline-block h-16 w-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  <div className="text-gray-300 text-xl sm:text-2xl font-semibold text-crisp">Carregando dados...</div>
                </div>
              ) : (
                <>
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    <MetricCard
                      title="Status"
                      value={online ? "Online" : "Offline"}
                      icon={<div className={`h-4 w-4 rounded-full ${online ? "bg-green-400 animate-pulse shadow-lg shadow-green-400/50" : "bg-gray-500"}`} />}
                      className={online ? "border-green-500/40 bg-gradient-to-br from-green-500/15 to-transparent hover:border-green-500/60" : "border-gray-700/40"}
                    />
                    <MetricCard
                      title="Usuários Conectados"
                      value={status?.wsUsers ?? 0}
                      description="WebSocket"
                      className="border-blue-500/40 bg-gradient-to-br from-blue-500/15 to-transparent hover:border-blue-500/60"
                    />
                    <MetricCard
                      title="CPU"
                      value={`${cpuPercent.toFixed(1)}%`}
                      description={status?.cpuLoad ? `Load: ${status.cpuLoad.map(n => n.toFixed(2)).join(" / ")}` : "—"}
                      className="border-purple-500/40 bg-gradient-to-br from-purple-500/15 to-transparent hover:border-purple-500/60"
                    />
                    <MetricCard
                      title="Memória"
                      value={`${memPercent.toFixed(1)}%`}
                      description={status?.mem ? fmtMemMB(status.mem.total, status.mem.free) : "—"}
                      className="border-pink-500/40 bg-gradient-to-br from-pink-500/15 to-transparent hover:border-pink-500/60"
                    />
                  </div>

                  <Separator className="opacity-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                  {/* System Information */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-crisp tracking-tight">
                        Informações do Sistema
                      </h3>
                      <p className="text-base sm:text-lg text-gray-400 font-light">
                        Detalhes técnicos e configurações do dispositivo
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                      <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-800/60 hover:border-green-500/40 transition-all duration-300 hover:bg-black/50">
                        <p className="text-sm text-gray-400 mb-3 font-bold uppercase tracking-wider text-crisp">Endereço IP</p>
                        <p className="font-mono text-2xl sm:text-3xl text-green-400 font-black text-crisp tracking-tight">
                          {status?.ip || "—"}
                        </p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-800/60 hover:border-blue-500/40 transition-all duration-300 hover:bg-black/50">
                        <p className="text-sm text-gray-400 mb-3 font-bold uppercase tracking-wider text-crisp">Hostname</p>
                        <p className="text-2xl sm:text-3xl text-gray-200 font-black text-crisp tracking-tight">
                          {status?.hostname || "—"}
                        </p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gray-800/60 hover:border-purple-500/40 transition-all duration-300 hover:bg-black/50">
                        <p className="text-sm text-gray-400 mb-3 font-bold uppercase tracking-wider text-crisp">Tempo Ativo</p>
                        <p className="text-2xl sm:text-3xl text-blue-400 font-black text-crisp tracking-tight">
                          {status?.uptimeSec != null ? fmtUptime(status.uptimeSec) : "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Charts */}
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-crisp tracking-tight">
                        Gráficos de Performance
                      </h3>
                      <p className="text-base sm:text-lg text-gray-400 font-light">
                        Monitoramento em tempo real de CPU e Memória
                      </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                      <TimeSeriesChart title="CPU (%)" data={cpuSeries} yLabel="%" max={100} color="#3b82f6" />
                      <TimeSeriesChart title="RAM (%)" data={ramSeries} yLabel="%" max={100} color="#a855f7" />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
