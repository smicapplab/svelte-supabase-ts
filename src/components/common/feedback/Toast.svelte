<script lang="ts">
    import {
        removeToast,
        toasts,
        ToastType,
    } from "../../../stores/toastStores";

    let {
        horizontal = "center",
        vertical = "top",
    }: {
        horizontal?: Alignment;
        vertical?: Alignment;
    } = $props();

    type Alignment = "left" | "center" | "right" | "top" | "middle" | "bottom";

    interface AlignmentProps {
        horizontal?: Alignment;
        vertical?: Alignment;
    }

    const getAlignmentClass = ({
        horizontal,
        vertical,
    }: AlignmentProps): string => {
        const horizontalAlignment: Alignment = horizontal || "center";
        const verticalAlignment: Alignment = vertical || "top";

        const horizontalClass =
            horizontalAlignment === "left"
                ? "toast-start"
                : horizontalAlignment === "right"
                  ? "toast-end"
                  : "toast-center";

        const verticalClass =
            verticalAlignment === "top"
                ? "toast-top"
                : verticalAlignment === "bottom"
                  ? "toast-bottom"
                  : "toast-middle";

        return `${verticalClass} ${horizontalClass}`;
    };

    const getPath = (type: string) => {
        switch (type) {
            case ToastType.success:
                return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
            case ToastType.warning:
                return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`;
            case ToastType.info:
                return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
            case ToastType.error:
                return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
            default:
                return `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" />`;
        }
    };
</script>

<div
    class={`toast ${getAlignmentClass({
        horizontal,
        vertical,
    })}`}
>
    {#each $toasts as toast (toast.id)}
        <div class={`alert alert-${toast.type}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
            >
                {@html getPath(toast.type)}
            </svg>
            <span>{toast.message}</span>
            <button
                onclick={() => removeToast(toast.id)}
                class="ml-auto btn btn-sm btn-circle btn-ghost">&times;</button
            >
        </div>
    {/each}
</div>

<style>
    .toast {
        position: fixed;
        display: flex;
        flex-direction: column;
        right: 10px;
        width: 300px;
        max-width: 100%;
    }

    .toast-start {
        align-items: flex-start;
    }

    .toast-end {
        align-items: flex-end;
    }

    .toast-center {
        align-items: center;
    }

    .toast-top {
        justify-content: flex-start;
    }

    .toast-middle {
        justify-content: center;
    }

    .toast-bottom {
        justify-content: flex-end;
    }
</style>
