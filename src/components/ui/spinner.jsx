export function Spinner({ size = 6 }) {
  const spinnerSize = `h-${size} w-${size}`;
  return (
    <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${spinnerSize}`}></div>
  );
}
