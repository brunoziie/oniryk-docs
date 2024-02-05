import { AlertCircle } from 'lucide-react';

export default function InputErrorWrapper({
  children,
  error,
}: React.PropsWithChildren<{ error?: string }>) {
  return (
    <div className="relative">
      {children}
      {error && (
        <>
          <div className="absolute top-0 right-0 text-red-500 text-xs p-2">
            <AlertCircle size={16} className="mt-[2px]" />
          </div>
        </>
      )}
    </div>
  );
}
