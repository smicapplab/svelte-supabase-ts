import { json, type RequestHandler } from "@sveltejs/kit";

const validatePassword = (password: string): boolean => {
  // At least 8 characters
  if (password.length < 8) {
    return false;
  }

  // At least 1 upper case alphabet (A-Z)
  const hasUpperCase = /[A-Z]/.test(password);
  if (!hasUpperCase) {
    return false;
  }

  // At least 1 lower case alphabet (a-z)
  const hasLowerCase = /[a-z]/.test(password);
  if (!hasLowerCase) {
    return false;
  }

  // At least 1 number (0-9)
  const hasNumber = /\d/.test(password);
  if (!hasNumber) {
    return false;
  }

  // At least 1 special character (!@#$%^&*()_+-=[]{};':"\|,./?+)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,./?]+/.test(password);
  if (!hasSpecialChar) {
    return false;
  }

  // If all checks pass, the password is valid
  return true;
};

export const PUT: RequestHandler = async ({ request, locals }) => {
  const { password, newPassword } = await request.json();

  if (!validatePassword(password)) {
    return json({
      success: false,
      message:
        "Sorry, the new password you entered failed the validation. Please try again.",
    });
  }

  const { supabase, user } = locals;

  const { error } = await supabase.auth.signInWithPassword({
    email: user?.email,
    password: password,
  });

  if (error) {
    return json(
      {
        success: false,
        message:
          "Sorry, the current password you entered is incorrect. The password has not been updated.",
      }
    );
  }

  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })

  if (updateError) {
    return json({
        success: false,
        message:
          "Sorry, something went wrong and we cannot save your changes. Please try again.",
      });
  }

  return json({
    success: true,
    message: "Password is Updated!",
  });
};
