<script lang="ts">
  import Toast from "../../../components/common/feedback/Toast.svelte";
  import Koredor from "../../../components/common/icons/Koredor.svelte";
  import { goto } from "$app/navigation";

  let email: string = $state("");
  let { data } = $props();
  let { supabase } = data;

  const doResetPassword = async () => {
    try {
      let { data, error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        console.error("Error sending password reset email:", error.message);
      } else {
        console.log("Password reset email sent:", data);
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };
</script>

<main
  class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
>
  <div class="w-full max-w-md p-8 bg-white rounded shadow-md">
    <div class="">
      <Toast />
      <div class="flex justify-center mb-10 text-center">
        <Koredor />
      </div>
      <div class="flex flex-col items-center mt-12">
        <h1 class="text-2xl font-extrabold xl:text-3xl">Forgot Password</h1>
        <p>
          Enter the email address associated with your Koredor and we'll send
          you a link to reset your password.
        </p>
      </div>
      <div class="flex-1 w-full mt-8">
        <div class="mb-6">
          <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
            <i class="fa-solid fa-envelope"></i>
            <input
              placeholder="Email"
              type="text"
              class="p-2 bg-white grow"
              autocomplete="off"
              name="email"
              id="email"
              bind:value={email}
            />
          </label>
        </div>
      </div>

      <button
        onclick={doResetPassword}
        class="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-orange-500 rounded-lg hover:bg-orange-700 focus:shadow-outline focus:outline-none"
      >
        <i class="fa-solid fa-paper-plane"></i>
        <span class="ml-3">Continue</span>
      </button>

      <div class="divider"></div>
      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <button
          onclick={() => goto("/login")}
          class="text-blue-500 underline bg-transparent border-none hover:text-blue-700 focus:outline-none"
        >
          Sign Up!
        </button>
      </p>
    </div>
  </div>
</main>
