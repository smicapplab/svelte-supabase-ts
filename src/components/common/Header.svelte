<script lang="ts">
    let { data }: { data: any } = $props();
    let { supabase, user } = data;

    const signOut = async () => {
        await supabase.auth.signOut();
        window.location.replace("/login");
    };
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
            <a href="/" class="text-3xl btn btn-ghost logo-font"> koredor </a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    class="btn btn-ghost btn-circle avatar"
                >
                    <div
                        class="flex items-center justify-center w-10 h-10 text-white bg-gray-500 rounded-full"
                    >
                        <img
                            alt=""
                            src="https://media.licdn.com/dms/image/C5603AQFhYmu9TEYH9g/profile-displayphoto-shrink_100_100/0/1517793693890?e=1726704000&v=beta&t=-UfJIzlLO-bLPw61NjmOlRn4JU27FjE_QofMplaC7SA"
                            class="object-cover w-full h-full rounded-full"
                        />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <a href="/" class="justify-between">Profile</a>
                    </li>
                    <li>
                        <a href="/">Settings</a>
                    </li>
                    <li>
                        <button onclick={signOut}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
{/if}
