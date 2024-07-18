import { type Provider } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  loginWithProvider: async ({ locals, url }) => {
    const provider = url.searchParams.get("provider") as Provider;

    console.log("provider", provider);
    if (provider) {
      const { data, error } = await locals.supabase.auth.signInWithOAuth({
        provider,
      });

      if (error) {
        console.error(error);
        return fail(400, {
          message: "Oooops! Something went wrong",
        });
      }
      throw redirect(303, data.url);
    }

    throw redirect(403, "/login");
  },
};
