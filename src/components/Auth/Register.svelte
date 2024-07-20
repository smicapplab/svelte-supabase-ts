<script lang="ts">
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import "$lib/fontawesome";
  import Koredor from "../common/icons/Koredor.svelte";
  import { assembleFormData, parseResponse } from "$lib/formDataUtil";
  import { addToast, ToastType } from "../../stores/toastStores";
  import type { ParsedResponse } from "$lib/types/apiResponse";

  let firstName: string = $state("");
  let lastName: string = $state("");
  let email: string = $state("");
  let password: string = $state("");
  let mobile: string = $state("");

  let showPassword: boolean = $state(false);

  const togglePassword = () => {
    showPassword = !showPassword;
  };

  const handleSignUp = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      mobile,
    };

    const formData = assembleFormData(userData);

    const response = await fetch("?/signUpWithEmail", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
        console.log("++ OK ++");
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
</script>

<div>
  <div class="flex justify-center mb-10 text-center">
    <Koredor />
  </div>
  <h1 class="mb-10 text-xl font-bold xl:text-2xl">Sign Up</h1>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <FontAwesomeIcon icon="id-card" />
      <input
        placeholder="First Name"
        type="text"
        class="p-2 bg-white grow"
        autocomplete="off"
        name="firstName"
        id="firstName"
        bind:value={firstName}
      />
    </label>
  </div>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <FontAwesomeIcon icon="id-card" />
      <input
        placeholder="Last Name"
        type="text"
        class="p-2 bg-white grow"
        autocomplete="off"
        name="lastName"
        id="lastName"
        bind:value={lastName}
      />
    </label>
  </div>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <FontAwesomeIcon icon="envelope" />
      <input
        type="email"
        class="p-2 bg-white grow"
        autocomplete="off"
        name="email"
        id="email"
        bind:value={email}
      />
    </label>
  </div>
  <div class="mb-6">
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
  </div>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <span class="text-xs">+63</span>
      <input
        placeholder="Mobile"
        name="mobile"
        id="mobile"
        required
        type="tel"
        bind:value={mobile}
        class="grow"
      />
    </label>
    <div class="label">
      <span class="w-full text-xs text-right">Ex: 9170000001 or 9181111110</span
      >
    </div>
  </div>
  <div class="mb-6 text-sm">
    By creating an account, you agree to the Terms of Service. For more
    information about Koredor's privacy practices, see the Koredor Privacy
    Statement. We'll occasionally send you account-related emails.
  </div>
  <button
    onclick={handleSignUp}
    class="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-orange-500 rounded-lg hover:bg-orange-700 focus:shadow-outline focus:outline-none"
  >
    <FontAwesomeIcon icon="paper-plane" />
    <span class="ml-3">Sign Up</span></button
  >
</div>