export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/95 to-gray-950/95 text-white shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3 className={`text-2xl font-semibold leading-tight tracking-tight text-white ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-sm text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

