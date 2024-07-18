import type { PageData } from "../$types";

export const load: PageData = async ({ locals }: { locals: App.Locals }) => {
  const { supabase } = locals;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, message: "Hello there" };
};
