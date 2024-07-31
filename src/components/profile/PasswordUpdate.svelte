<script lang="ts">
  import { addToast, ToastType } from "../../stores/toastStores";

  let password = $state("");
  let newPassword = $state("");
  let isLoading: boolean = $state(false);
  let apiError = $state("");

  const {handleSubItemClick}: { handleSubItemClick: (text: string) => void } = $props();

  const validatePassword = (passwordInput: string) => {
    return {
      passwordLength: passwordInput.length >= 8,
      passwordUpper: /[A-Z]/.test(passwordInput),
      passwordLower: /[a-z]/.test(passwordInput),
      passwordNumber: /[0-9]/.test(passwordInput),
      passwordSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        passwordInput
      ),
    };
  };

  let passwordCheck: { [key: string]: boolean } = $derived(
    validatePassword(newPassword)
  );

  let showPassword: boolean = $state(false);
  let showNewPassword: boolean = $state(false);
  let isValid: boolean = $derived(
    password.length >= 8 &&
      passwordCheck.passwordLength &&
      passwordCheck.passwordUpper &&
      passwordCheck.passwordLower &&
      passwordCheck.passwordNumber &&
      passwordCheck.passwordSpecial
  );

  const doUpdatePassword = async () => {
    apiError = "";
    try {
      isLoading = true;
      const response = await fetch("/api/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, newPassword }),
      });

      if (response.ok) {
        const parsedResponse = await response.json();
        if (parsedResponse.success) {
          addToast(ToastType.success, "Password updated successfully", 3000);
          handleSubItemClick("");
        } else {
          apiError = parsedResponse.message;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="flex justify-center w-full">
  <div
    class="w-full max-w-2xl p-5 border border-gray-300 shadow-sm card bg-base-100"
  >
    <h1 class="text-2xl font-bold">Change Password</h1>
    <p class="pt-10 pb-10 text-sm text-gray-500">
      Please enter your old and new password. If you change your mind or don’t
      want to change your password, simply don’t submit the form.
    </p>
    {#if apiError.length > 0}
      <p class="pb-5 text-sm text-red-500">{apiError}</p>
    {/if}
    <div class="mb-6">
      <label class="w-full form-control">
        <div class="label">
          <span class="label-text">Your Current Password</span>
        </div>
        <label class="flex items-center gap-4 py-6 input input-bordered">
          <i class="fa-solid fa-lock"></i>
          <input
            type={showPassword ? "text" : "password"}
            class="p-2 bg-white grow"
            autocomplete="new-password"
            bind:value={password}
          />
          <button
            onclick={() => {
              showPassword = !showPassword;
            }}
          >
            {#if showPassword}
              <i class="fa-solid fa-eye-slash"></i>
            {:else}
              <i class="fa-solid fa-eye"></i>
            {/if}
          </button>
        </label>
        {#if password.length < 8}
          <div class="label">
            <span class="text-xs text-red-500 label-text"
              >Please enter your current password</span
            >
          </div>
        {/if}
      </label>
    </div>

    <div class="mb-6">
      <label class="w-full form-control">
        <div class="label">
          <span class="label-text">Your New Password</span>
        </div>
        <label class="flex items-center gap-4 py-6 input input-bordered">
          <i class="fa-solid fa-lock"></i>
          <input
            type={showNewPassword ? "text" : "password"}
            class="p-2 bg-white grow"
            autocomplete="new-password"
            bind:value={newPassword}
          />
          <button
            onclick={() => {
              showNewPassword = !showNewPassword;
            }}
          >
            {#if showNewPassword}
              <i class="fa-solid fa-eye-slash"></i>
            {:else}
              <i class="fa-solid fa-eye"></i>
            {/if}
          </button>
        </label>
      </label>
    </div>

    <div class="p-2 text-xs">
      <ul class="text-green-500">
        <li class:text-red-500={!passwordCheck.passwordLength}>
          <i
            class={`fa-solid ${passwordCheck.passwordLength ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i>
          <span>At least 8 characters</span>
        </li>
        <li class:text-red-500={!passwordCheck.passwordUpper}>
          <i
            class={`fa-solid ${passwordCheck.passwordUpper ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 upper case alphabet (A-Z)
        </li>
        <li class:text-red-500={!passwordCheck.passwordLower}>
          <i
            class={`fa-solid ${passwordCheck.passwordLower ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 lower case alphabet (a-z)
        </li>
        <li class:text-red-500={!passwordCheck.passwordNumber}>
          <i
            class={`fa-solid ${passwordCheck.passwordNumber ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 number (0-9)
        </li>
        <li class:text-red-500={!passwordCheck.passwordSpecial}>
          <i
            class={`fa-solid ${passwordCheck.passwordSpecial ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 special character (!@#$%^&*()_+-=&#91;&#93;&#123;&#125;;':"\\|,./?+)
        </li>
      </ul>
    </div>

    <div class="grid w-full grid-cols-2 gap-4 p-5">
      <button
        onclick={() => handleSubItemClick("")}
        class="btn btn-md btn-neutral">Cancel</button
      >
      {#if isLoading}
        <button class="btn btn-ghost"
          ><span class="loading loading-spinner"></span></button
        >
      {:else}
        <button
          disabled={!isValid}
          onclick={doUpdatePassword}
          class="btn btn-md btn-secondary">Save</button
        >
      {/if}
    </div>
  </div>
</div>
