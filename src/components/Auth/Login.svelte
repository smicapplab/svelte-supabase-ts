<script lang="ts">
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import "$lib/fontawesome";
  import { addToast, ToastType } from "../../stores/toastStores";
  import Toast from "../common/feedback/Toast.svelte";
  import Koredor from "../common/icons/Koredor.svelte";
  import { assembleFormData, parseResponse } from "$lib/formDataUtil";
  import type { ParsedResponse } from "$lib/types/apiResponse";
  import { onDestroy, onMount } from "svelte";

  let email: string = $state("");
  let password: string = $state("");

  let showPassword: boolean = $state(false);

  const togglePassword = () => {
    showPassword = !showPassword;
  };

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    const formData = assembleFormData(userData);

    const response = await fetch("?/signInWithEmail", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const parsedResponse: ParsedResponse = await parseResponse(response);
      const { success, message } = parsedResponse.data;
      if (success) {
        window.location.replace("/dashboard");
      } else {
        addToast(ToastType.error, message, 3000);
      }
    } else {
      console.log("Network response was not ok.");
    }
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // Add event listener when the component is mounted, only in the browser
  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleEnterKey);
    }
  });

  // Clean up the event listener when the component is destroyed, only in the browser
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleEnterKey);
    }
  });
</script>

<div class="">
  <Toast />
  <div class="flex justify-center mb-10 text-center">
    <Koredor />
  </div>
  <div class="flex flex-col items-center mt-12">
    <h1 class="text-2xl font-extrabold xl:text-3xl">Welcome Back!</h1>
    <div class="flex-1 w-full mt-8">
      <div class="max-w-xs mx-auto">
        <div class="mb-6">
          <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
            <FontAwesomeIcon icon="envelope" />
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

        <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
          <FontAwesomeIcon icon="lock-open" />
          <input
            type={showPassword ? "text" : "password"}
            class="p-2 bg-white grow"
            autocomplete="off"
            name="hidden"
            id="hidden"
            bind:value={password}
          />
          <button onclick={togglePassword}>
            {#if showPassword}
              <FontAwesomeIcon icon="eye-slash" />
            {:else}
              <FontAwesomeIcon icon="eye" />
            {/if}
          </button>
        </label>

        <button
          onclick={handleLogin}
          class="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-orange-500 rounded-lg hover:bg-orange-700 focus:shadow-outline focus:outline-none"
        >
          <FontAwesomeIcon icon="right-to-bracket" />
          <span class="ml-3"> Sign In </span>
        </button>
      </div>

      <p class="mt-4 text-center text-gray-600">
        <button
          class="text-blue-500 underline bg-transparent border-none hover:text-blue-700 focus:outline-none"
        >
          Forgot your password?
        </button>
      </p>

      <div class="my-12 text-center border-b">
        <div
          class="inline-block px-8 text-lg font-bold leading-none tracking-wide text-gray-600 transform translate-y-1/2 bg-white"
        >
          Or sign in with
        </div>
      </div>

      <form
        class="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4"
        method="POST"
      >
        <button
          formaction="?/loginWithProvider&provider=facebook"
          class="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={["fab", "facebook"]} />
          <span class="ml-3">Facebook</span>
        </button>

        <button
          formaction="?/loginWithProvider&provider=google"
          class="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
        >
          <FontAwesomeIcon icon={["fab", "google"]} />
          <span class="ml-3">Google</span>
        </button>
      </form>
    </div>
  </div>
</div>
