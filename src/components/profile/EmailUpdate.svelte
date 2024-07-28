<script lang="ts">
  import type { PageData } from "../../routes/$types";

  let errorMessage = $state("");
  let isLoading: boolean = $state(false);

  const {
    data,
    handleSubItemClick,
  }: {
    data: PageData;
    handleSubItemClick: (text: string) => void;
  } = $props();
  let { user, profile, supabase } = data;

  const doSaveEmail = async () => {
    try {
      isLoading = true;
      const response = await fetch("/api/validateEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: profile.email }),
      });

      if (response.ok) {
        const parsedResponse = await response.json();
        if (parsedResponse.success) {
          if (user.appMetadata.provider === "email") {
            supabase.auth.update({ email: profile.email });
          }

          const { error: supabaseError } = await supabase
            .from("profiles")
            .update({
              email: profile.email || "",
              username: profile.email || "",
            })
            .eq("id", user?.id)
            .single();

          if (supabaseError) {
            errorMessage =
              "Sorry, something went wrong and we cannot save your changes. Please try again.";
          }
          handleSubItemClick("");
        } else {
          errorMessage = parsedResponse.message;
        }
      } else {
        errorMessage =
          "Sorry, something went wrong and we cannot save your changes. Please try again.";
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
    <h1 class="text-2xl font-bold">Email / Username Update</h1>
    {#if user?.appMetadata?.provider === "email"}
      <p class="pt-10 pb-10 text-sm text-gray-500">
        Your email is already linked to your Koredor account. Changing the email
        will also update your Koredor account username. Are you sure you want to
        proceed?
      </p>
    {:else}
      <p class="pt-5 pb-5 text-sm text-gray-500">
        Since you have signed up using Google or Facebook, this change will not
        affect your login details.
      </p>
    {/if}
    <label class="w-full form-control">
      <input
        type="text"
        name="firstName"
        placeholder="Your First Name"
        bind:value={profile.email}
        class="max-w-full input input-bordered"
      />
      {#if errorMessage}
        <span class="text-red-500 label-text-alt">
          {errorMessage}
        </span>
      {/if}
    </label>
    <div class="grid w-full grid-cols-2 gap-4 p-5">
      <button onclick={() => handleSubItemClick("")} class="btn btn-md btn-neutral"
        >Cancel</button
      >
      {#if isLoading}
      <button class="btn btn-ghost"><span class="loading loading-spinner"></span></button>
      {:else}
        <button onclick={doSaveEmail} class="btn btn-md btn-secondary"
          >Save</button
        >
      {/if}
    </div>
  </div>
</div>
