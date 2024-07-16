<script lang="ts">
    import "../app.css";
    import Header from "../components/common/Header.svelte";
    import Wrapper from "../components/Wrapper.svelte";
    import type { Snippet } from "svelte";

    let { data, children }: { data: any; children: Snippet } = $props();
</script>

<Header { data }/>
<Wrapper>
    {@render children()}
</Wrapper>
