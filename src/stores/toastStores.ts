import { writable } from 'svelte/store';

interface Toast {
    id: number;
    type: string;
    message: string;
    duration: number;
}

export const ToastType = {
    success: "success",
    warning: "warning",
    info: "info",
    error: "error",
};

const toasts = writable<Toast[]>([]);

let idCounter = 0;

export function addToast(type: string, message: string, duration: number = 5000) {
    const id = idCounter++;
    const newToast: Toast = { id, type, message, duration };
    toasts.update(t => [...t, newToast]);

    setTimeout(() => removeToast(id), duration);
}

export function removeToast(id: number) {
    toasts.update(t => t.filter(toast => toast.id !== id));
}

export { toasts };