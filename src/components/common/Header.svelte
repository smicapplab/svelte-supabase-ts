<script lang="ts">
    import Koredor from "./icons/Koredor.svelte";
    let { data }: { data: any } = $props();
    let { supabase, user, profile } = data;
  
    const signOut = async () => {
      await supabase.auth.signOut();
      window.location.replace("/login");
    };
  
    const getInitials = (firstName: string, lastName: string) => {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };
  
    const stringToColor = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let color = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
      }
      return color;
    };
  
    const avatarColor = profile ? stringToColor(profile.firstName + profile.lastName) : '#gray';
  </script>
  
  {#if user !== null}
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <label for="koredor-drawer">
          <svg
            class={`w-6 h-6`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
        <a href="/" class="text-3xl pointer-events-none btn btn-ghost logo-font">
          <Koredor />
        </a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabIndex={0} role="button" class="btn btn-ghost btn-circle avatar">
            <div class="flex items-center justify-center w-10 h-10 text-white rounded-full" style="background-color: {avatarColor}">
              {#if profile.avatarUrl}
                <img
                  alt=""
                  src={profile.avatarUrl}
                  class="object-cover w-full h-full rounded-full"
                />
              {:else}
                <span class="flex items-center justify-center h-full text-lg font-bold">
                  {getInitials(profile.firstName, profile.lastName)}
                </span>
              {/if}
            </div>
          </div>
          <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80"
          >
            <li class="text-left">
              <p class="pl-4 text-xl font-black pointer-events-none text-secondary">Hi, {profile?.firstName || "User"}!</p>
              <p class="pl-4 text-sm italic pointer-events-none">{profile?.email}</p>
            </li>
            <li>
              <button onclick={()=>{window.location.replace("/profile")}}>Manage your Koredor Account</button>
            </li>
            <li>
              <button onclick={signOut}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  {/if}

  <style>
    ul {
      margin-top: 0.75rem;
      z-index: 1; 
      padding: 0.5rem; 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
      background-color: #ffffff; 
      border-radius: 0.375rem; 
      width: 20rem; 
      text-align: center; 
    }  
    button {
      background-color: transparent; /* no background color */
      font-size: 1rem; /* normal text size */
      text-decoration: none; /* no text decoration */
      text-align: left !important; /* left aligned */
      border: none; /* remove default button styles */
      padding: 1rem; /* remove default padding */
      cursor: pointer; /* make it look clickable */
    }
  
    button:hover {
      background-color: transparent; /* no hover effect */
      text-decoration: none; /* no hover effect */
    }

    h2 {
      pointer-events: none; 
      background-color: transparent; /* no hover effect */
      text-decoration: none; /* no hover effect */
    }
  </style>