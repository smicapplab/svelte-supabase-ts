<script>
    import Header from "../components/common/Header.svelte";
    import Wrapper from "../components/Wrapper.svelte";
</script>


    <h1>Welcome to Koredor</h1>
    <p>Nothing to see here move along</p>

    <ul class="mt-20">
        <li><a href="/login" class="cursor-auto">Go to Login Page</a></li>
        <li><a href="/dashboard" class="cursor-auto">Dashboard</a></li>
        <li><a href="/profile" class="cursor-auto">Profile</a></li>
    </ul>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
