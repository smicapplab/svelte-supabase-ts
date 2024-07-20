<script lang="ts">
    let { data } = $props();
    let { user, message, profile } = data;

    console.log(profile);
</script>

<main
    class="flex flex-col items-center justify-center"
>
    <div class="w-full p-8 bg-white rounded shadow-md max-w-7xl">
        DASHBOARD
        <div>
            You are logged in as { user?.email } { message }
        </div>
    </div>
</main>
