interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message = "Cargando...",
  fullScreen = true,
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-b-2",
    lg: "h-16 w-16 border-b-3",
  };

  const spinnerContent = (
    <div className="text-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-blue-700 mx-auto mb-4`}
      ></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinnerContent}
    </div>
  );
}