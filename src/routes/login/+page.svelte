<script lang="ts">
    export let data;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    console.log({ supabase, session });
</script>

<div></div>