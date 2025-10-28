import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function MetricCard({ title, value, description, icon, className = "" }) {
  return (
    <Card className={`metric-card-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group card-hover-effect ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-5 sm:p-6">
        <CardTitle className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider text-crisp">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-gray-500 opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-5 sm:p-6 pt-0">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 drop-shadow-2xl text-crisp tracking-tight">
          {value}
        </div>
        {description && (
          <p className="text-sm sm:text-base text-gray-400 font-medium text-crisp leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

