<script lang="ts">
    import Login from "../../components/Auth/Login.svelte";
    let { data } = $props();
    let { supabase, session } = data;

    if (session) {
        window.location.replace("/dashboard");
    }

    let isLogin: boolean = $state(true);
    const toggleForm = () => {
        isLogin = !isLogin;
    };
</script>

<main
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
>
    <div class="w-full max-w-md p-8 bg-white rounded shadow-md">
        {#if isLogin}
            <Login {supabase} />
        {:else}
            <div>ccccc</div>
        {/if}
        <p class="mt-4 text-center text-gray-600">
            <button
                onclick={toggleForm}
                class="text-blue-500 underline bg-transparent border-none hover:text-blue-700 focus:outline-none"
            >
                {isLogin ? "Register" : "Login"}
            </button>
        </p>
    </div>
</main>
