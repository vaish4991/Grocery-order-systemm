'use client';

import { useState, useCallback } from 'react';

type ToastVariant = 'default' | 'destructive';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toastQueue: Toast[] = [];

export function useToast() {
  const toast = useCallback(
    ({
      title,
      description,
      variant = 'default',
    }: {
      title: string;
      description?: string;
      variant?: ToastVariant;
    }) => {
      const id = Math.random().toString(36).slice(2);
      const newToast: Toast = { id, title, description, variant };
      toastQueue = [...toastQueue, newToast];
      toastListeners.forEach((l) => l([...toastQueue]));

      setTimeout(() => {
        toastQueue = toastQueue.filter((t) => t.id !== id);
        toastListeners.forEach((l) => l([...toastQueue]));
      }, 3000);
    },
    [],
  );

  return { toast };
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Register listener
  useState(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToasts);
    };
  });

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-72">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-4 rounded-xl shadow-lg border animate-fade-in ${
            t.variant === 'destructive'
              ? 'bg-red-600 text-white border-red-500'
              : 'bg-white text-gray-900 border-gray-200'
          }`}
        >
          <div className="font-semibold text-sm">{t.title}</div>
          {t.description && (
            <div className={`text-xs mt-0.5 ${t.variant === 'destructive' ? 'text-red-100' : 'text-gray-500'}`}>
              {t.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
