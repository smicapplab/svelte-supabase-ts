import { destructureFormData } from "$lib/formDataUtil";
import { type Provider } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  loginWithProvider: async ({ locals, url }) => {
    const provider = url.searchParams.get("provider") as Provider;
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
  signInWithEmail: async ({ request, locals }) => {
    const { email, password } = await destructureFormData(request.formData()); 
    console.log({ email, password });
    const { error } = await locals.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.error("signInWithEmail", error);
    if( error ){
      return {
        success: false,
        message: "Opps something went wrong!",
      };  
    }

    return {
      success: true,
      message: "User signed in successfully",
    };
  },
  signUpWithEmail: async ({ request, locals }) => {
    const { firstName, lastName, email, password, mobile } = await destructureFormData(request.formData());

    const { error } = await locals.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          mobile: mobile || "",
          email,
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error("signUpWithEmail", error);
      return {
        success: false,
        message: "Opps something went wrong!",
      };
    }

    return {
      success: true,
      message: "User signed up and profile created successfully",
    };
  },
};
