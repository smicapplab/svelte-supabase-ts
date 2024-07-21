import { json, type RequestHandler } from "@sveltejs/kit";
import {
  EMAIL_LIST_VERIFY_SECRET,
  EMAIL_LIST_VERIFY_URL,
} from "$env/static/private";

export const POST: RequestHandler = async ({ request, locals }) => {
  const { email } = await request.json();

  const { data: profileData } = await locals.supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (profileData) {
    return json({
      success: false,
      message:
        "Email is already registered. Please login instead or use another email.",
    });
  }

  const response = await fetch(
    `${EMAIL_LIST_VERIFY_URL}secret=${EMAIL_LIST_VERIFY_SECRET}&email=${email}&timeout=15`
  );

  if (!response.ok) {
    return json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }

  const contentType = response.headers.get("content-type");
  let jsonResponse;

  if (contentType && contentType.indexOf("application/json") !== -1) {
    jsonResponse = await response.json();
  } else {
    const textResponse = await response.text();
    jsonResponse = { text: textResponse };
  }

  if (jsonResponse.text.toLowerCase() === "ok") {
    return json({
      success: true,
    });
  } else {
    return json({
      success: false,
      message: "Email looks to be invalid, kindly check for typos",
    });
  }
};
