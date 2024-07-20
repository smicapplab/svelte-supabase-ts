<script lang="ts">
  import Login from "../../components/Auth/Login.svelte";
  import Register from "../../components/Auth/Register.svelte";
  import Toast from "../../components/common/feedback/Toast.svelte";
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
      <Register />
    {/if}
    <div class="divider"></div>
    <p class="mt-4 text-center text-gray-600">
      {#if isLogin}
        New to Koredor?
      {:else}
        Already have a Koredor account?
      {/if}
      <button
        onclick={toggleForm}
        class="text-blue-500 underline bg-transparent border-none hover:text-blue-700 focus:outline-none"
      >
        {isLogin ? "Sign Up!" : "Sign In!"}
      </button>
    </p>
  </div>
  <Toast />
</main>
