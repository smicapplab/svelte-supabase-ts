// See https://kit.svelte.dev/docs/types#app

import type { DatabaseProfile } from "$lib/types/profile";
import type { Session, User } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: ReturnType<typeof createServerClient>;
      session: Session | null;
      user: User | null;
      safeGetSession: () => Promise<{
        session: Session | null;
        user: User | null;
      }>;
    }
    interface PageData {
      supabase: ReturnType<typeof createServerClient>;
      session: Session | null;
      user: User | null;
      profile: DatabaseProfile | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

declare module "@fortawesome/pro-solid-svg-icons/index.es" {
  export * from "@fortawesome/pro-solid-svg-icons";
}

export {};
