<script lang="ts">
  import Toast from "../../components/common/feedback/Toast.svelte";
  import Company from "../../components/common/profile/Company.svelte";
  import EmailUpdate from "../../components/common/profile/EmailUpdate.svelte";
  import Personal from "../../components/common/profile/Personal.svelte";
  import Security from "../../components/common/profile/Security.svelte";
  import { page } from '$app/stores';

  let props = $props();
  let tab = $page.url.searchParams.get("tab");

  const menuItems = [
    {
      icon: "fa-solid fa-id-badge",
      text: "Personal Information",
    },
    {
      icon: "fa-solid fa-building",
      text: "Company Information",
    },
    {
      icon: "fa-solid fa-shield-alt",
      text: "Security",
    },
  ];

  let activeItem = $state(tab || menuItems[0].text);
  let activeSubItem = $state("");

  const handleNavClick = (text: string) => {
    activeItem = text;
    activeSubItem = "";
  };

  const handleSubItemClick = (text: string) => {
    activeSubItem = text;
  };
</script>

<!-- This div will be visible on screens smaller than md -->
<div class="lg:hidden">
  <div role="tablist" class="pb-10 tabs tabs-bordered">
    {#each menuItems as item}
      <button
        class={`tab tab-lifted ${item.text === activeItem ? "tab-active tab-item-active" : ""}`}
        onclick={() => handleNavClick(item.text)}>{item.text}</button
      >
    {/each}
  </div>
  {#if activeSubItem === ""}
    {#if activeItem === "Personal Information"}
      <Personal {...props} {handleSubItemClick} />
    {:else if activeItem === "Company Information"}
      <Company />
    {:else if activeItem === "Security"}
      <Security />
    {/if}
  {:else if activeSubItem === "EmailUpdate"}
    <EmailUpdate {...props}/>
  {/if}
</div>

<!-- This div will be visible on screens md and larger -->
<div class="hidden gap-4 p-5 lg:grid lg:grid-cols-4">
  <div class="col-span-1">
    <ul class="w-full max-w-xs menu">
      {#each menuItems as item}
        <li
          class={`flex rounded-md items-start ${activeItem === item.text ? "menu-item-active" : "text-gray-600"}`}
        >
          <button
            class="btn btn-link text-inherit"
            onclick={() => handleNavClick(item.text)}
            ><i class={item.icon}></i> {item.text}</button
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="col-span-3">
    {#if activeSubItem === ""}
      {#if activeItem === "Personal Information"}
        <Personal {...props} {handleSubItemClick} />
      {:else if activeItem === "Company Information"}
        <Company />
      {:else if activeItem === "Security"}
        <Security />
      {/if}
    {:else if activeSubItem === "EmailUpdate"}
      <EmailUpdate {...props} handleSubItemClick={handleSubItemClick} />
    {/if}
  </div>
</div>
<Toast />

<style>
  .menu-item-active {
    background-color: #f97316;
    color: white;
    border-radius: 0 9999px 9999px 0;
  }
  .tab-item-active {
    background-color: #f97316;
    color: white;
    border-radius: 15px 15px 0 0;
  }
</style>
