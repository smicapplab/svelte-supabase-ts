<script lang="ts">
    //import { goto } from "$app/navigation";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import { addToast, ToastType } from "../../stores/toastStores";
    import Toast from "../common/feedback/Toast.svelte";

    let { supabase }: { supabase: SupabaseClient } = $props();
    let email: string = $state("");
    let password: string = $state("");
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            addToast(
                ToastType.error,
                "You have entered an invalid email or password!",
                3000,
            );
            return false;
        }

        window.location.replace("/dashboard");
        //await goto("/dashboard");
    };
</script>

<div class="">
    <Toast />
    <div class="mb-10 text-center logo-font">KOREDOR LOGO HERE</div>
    <div class="flex flex-col items-center mt-12">
        <h1 class="text-2xl font-extrabold xl:text-3xl">Welcome Back!</h1>
        <div class="flex-1 w-full mt-8">
            <div class="max-w-xs mx-auto">
                <input
                    class="w-full px-8 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    bind:value={email}
                />
                <input
                    class="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    bind:value={password}
                />
                <button
                    onclick={handleLogin}
                    class="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-orange-500 rounded-lg hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                >
                    <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3"> Sign In </span>
                </button>
            </div>
        </div>
    </div>
</div>
