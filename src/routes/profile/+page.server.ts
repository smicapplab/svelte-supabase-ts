import type { Actions } from "@sveltejs/kit";
import { keysToCamelCase } from "$lib/types/caseConversion";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageData } from "../$types";
import { emailSchema, profileSchema } from "$lib/validators/Profile";

export const load: PageData = async ({ locals }: { locals: App.Locals }) => {
  const { supabase, user } = locals;
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (profileData) {
    const profile = keysToCamelCase(profileData);
    const { firstName, middleName, lastName, mobileNumber, website } = profile;
    const form = await superValidate(
      { firstName, middleName, lastName, mobileNumber, website },
      zod(profileSchema)
    );
    return {
      form,
      profile,
    };
  }

  return {
    form: null,
  };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    const form = await superValidate(request, zod(profileSchema));
    if (!form.valid) {
      return {
        form,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { firstName, middleName, lastName, mobileNumber, website } =
      form.data as { [key: string]: any };
    const { supabase, user } = locals;
    try {
      const { error: supabaseError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName || "",
          middle_name: middleName || "",
          last_name: lastName || "",
          mobile_number: mobileNumber || "",
          website: website || "",
        })
        .eq("id", user?.id)
        .single();

      if (supabaseError) {
        console.error(supabaseError);
      }

      return {
        form,
      };
    } catch (e) {
      console.error(e);
      return {
        form,
        success: false,
      };
    }
  }
};
