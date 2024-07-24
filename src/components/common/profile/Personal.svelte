<script lang="ts">
  import { profileSchema } from "$lib/validators/Profile";
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "../../../routes/$types";
  import { addToast, ToastType } from "../../../stores/toastStores";

  const {
    data,
    handleSubItemClick,
  }: { data: PageData; handleSubItemClick: (text: string) => void } = $props();
  const { form: initialForm, profile } = data;
  let isLoading: boolean = $state(false);

  const { form, errors, enhance } = superForm(initialForm, {
    taintedMessage:
      "You have unsaved changes. Are you sure you want to leave this page?",
    validators: zod(profileSchema),
    invalidateAll: "force",
    onSubmit: () => {
      isLoading = true;
    },
    onResult: (result) => {
      const { result: formResult } = result;
      if (formResult.type === "failure") {
        addToast(
          ToastType.error,
          "Please correct the errors in the form",
          3000
        );
      }
      if (formResult.type === "success") {
        console.log("RESULT:", formResult);
        addToast(
          ToastType.success,
          "Personal Profile updated successfully",
          3000
        );
      }
      isLoading = false;
    },
  });
</script>

<SuperDebug data={form} />
<div class="w-full p-5">
  <div class="gap-4 p-5 md:grid md:grid-cols-2">
    <div
      class="w-full h-full p-5 border border-gray-300 shadow-sm card bg-base-100"
    >
      <h1 class="text-2xl font-bold">Basic info</h1>
      <form
        class="flex flex-col w-full gap-4"
        action="?/updateProfile"
        method="POST"
        use:enhance
      >
        <label class="w-full form-control">
          <div class="label">
            <span class="label-text">First Name</span>
          </div>
          <input
            type="text"
            name="firstName"
            placeholder="Your First Name"
            bind:value={$form.firstName}
            class="max-w-full input input-bordered"
          />
          {#if $errors.firstName}
            <span class="text-red-500 label-text-alt">
              {$errors.firstName}
            </span>
          {/if}
        </label>

        <label class="w-full form-control">
          <div class="label">
            <span class="label-text">Middle Name</span>
          </div>
          <input
            type="text"
            name="middleName"
            placeholder="Your Middle Name"
            bind:value={$form.middleName}
            class="max-w-full input input-bordered"
          />
          {#if $errors.middleName}
            <span class="text-red-500 label-text-alt">
              {$errors.middleName}
            </span>
          {/if}
        </label>

        <label class="max-w-full form-control">
          <div class="label">
            <span class="label-text">Last Name</span>
          </div>
          <input
            type="text"
            name="lastName"
            placeholder="Your Last Name"
            bind:value={$form.lastName}
            class="max-w-full input input-bordered"
          />
          {#if $errors.lastName}
            <span class="text-red-500 label-text-alt">
              {$errors.lastName}
            </span>
          {/if}
        </label>

        <label class="max-w-full form-control">
          <div class="label">
            <span class="label-text">Mobile Number</span>
          </div>
          <label class="flex items-center gap-2 input input-bordered">
            +63
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Your Mobile Number"
              bind:value={$form.mobileNumber}
              class="max-w-full grow"
            />
          </label>

          {#if $errors.mobileNumber}
            <span class="text-red-500 label-text-alt">
              {$errors.mobileNumber}
            </span>
          {/if}
        </label>

        <label class="max-w-full form-control">
          <div class="label">
            <span class="label-text"
              >Website (LinkedIn/Facebook/Social Media Link)</span
            >
          </div>
          <input
            type="text"
            name="website"
            bind:value={$form.website}
            class="max-w-full input input-bordered"
          />
          {#if $errors.website}
            <span class="text-red-500 label-text-alt">
              {$errors.website}
            </span>
          {/if}
        </label>

        {#if isLoading}
          <button class="btn btn-ghost"
            ><span class="loading loading-spinner"></span></button
          >
        {:else}
          <button
            class="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            <span class="ml-3">Save</span>
          </button>
        {/if}
      </form>
    </div>
    <div class="h-full">
      <div class="p-5 mb-5 border border-gray-300 shadow-sm card bg-base-100">
        <h1 class="mb-2 text-2xl font-bold">Koredor Account</h1>
        <h2 class="font-bold">Avatar</h2>
        <div class="flex items-center justify-between">
          <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {profile.email}
          </div>
          <button class="relative ml-4 btn btn-link group">
            <i class="fas fa-edit"></i>
            <span
              class="absolute px-2 py-1 -mb-2 text-xs text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100"
            >
              Edit
            </span>
          </button>
        </div>
        <div class="divider"></div>

        <h2 class="font-bold">Email/Username</h2>
        <div class="flex items-center justify-between">
          <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {profile.email}
          </div>
          <button
            class="relative ml-4 btn btn-link group"
            onclick={() => handleSubItemClick("EmailUpdate")}
          >
            <i class="fas fa-edit"></i>
            <span
              class="absolute px-2 py-1 -mb-2 text-xs text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100"
            >
              Edit
            </span>
          </button>
        </div>
        <div class="divider"></div>

        <h2 class="font-bold">Password</h2>
        <div class="flex items-center justify-between">
          <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            ********
          </div>
          <button class="relative ml-4 btn btn-link group">
            <i class="fas fa-edit"></i>
            <span
              class="absolute px-2 py-1 -mb-2 text-xs text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100"
            >
              Edit
            </span>
          </button>
        </div>
      </div>

      <div class="p-5 border border-gray-300 shadow-sm card bg-base-100">
        <h1 class="mb-2 text-2xl font-bold">Home Address</h1>
        <div class="flex items-center justify-between">
          <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {profile.homeAddress || "No home address set"}
          </div>
          <button class="relative ml-4 btn btn-link group">
            <i class="fas fa-edit"></i>
            <span
              class="absolute px-2 py-1 -mb-2 text-xs text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100"
            >
              Edit
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
