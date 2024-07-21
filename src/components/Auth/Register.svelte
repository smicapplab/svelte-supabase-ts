<script lang="ts">
  import Koredor from "../common/icons/Koredor.svelte";
  import { assembleFormData, parseResponse } from "$lib/formDataUtil";
  import { addToast, ToastType } from "../../stores/toastStores";
  import type { ParsedResponse } from "$lib/types/apiResponse";
  import { onMount } from "svelte";

  let firstName: string = $state("");
  let lastName: string = $state("");
  let email: string = $state("");
  let password: string = $state("");
  let mobile: string = $state("");
  let passwordCheck: { [key: string]: boolean } = $state({
    passwordLength: false,
    passwordUpper: false,
    passwordLower: false,
    passwordNumber: false,
    passwordSpecial: false,
  });

  let showPassword: boolean = $state(false);
  let errors: { [key: string]: string } = $state({});
  let debounceTimers: { [key: string]: ReturnType<typeof setTimeout> } = {};

  const togglePassword = () => {
    showPassword = !showPassword;
  };

  const handleSignUp = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      addToast(ToastType.error, "Please correct the errors in the form", 3000);
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      mobile,
    };

    const formData = assembleFormData(userData);

    const response = await fetch("?/signUpWithEmail", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const parsedResponse: ParsedResponse = await parseResponse(response);
      const { success, message } = parsedResponse.data;
      if (success) {
        window.location.replace("/dashboard");
      } else {
        addToast(ToastType.error, message, 3000);
      }
    } else {
      console.log("Network response was not ok.");
      addToast(ToastType.error, "An error occurred. Please try again.", 3000);
    }
  };

  const validatePassword = (passwordInput: string) => {
    let hasError = false;
    if (passwordInput === "") {
      hasError = true;
      passwordCheck = {
        passwordLength: false,
        passwordUpper: false,
        passwordLower: false,
        passwordNumber: false,
        passwordSpecial: false,
      };
    } else {
      passwordCheck = {
        ...passwordCheck,
        passwordLength: passwordInput.length >= 8,
        passwordUpper: /[A-Z]/.test(passwordInput),
        passwordLower: /[a-z]/.test(passwordInput),
        passwordNumber: /[0-9]/.test(passwordInput),
        passwordSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
          passwordInput
        ),
      };

      for (const key in passwordCheck) {
        if (passwordCheck[key] === false) {
          hasError = true;
          break;
        }
      }
    }
    return hasError;
  };

  const validateEmail = async () => {
    const response = await fetch("/api/validateEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse;
    } else {
      addToast(ToastType.error, "An error occurred. Please try again.", 3000);
      return false;
    }
  }

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "firstName":
        if (!value.trim()) errors[field] = `First Name is required`;
        else delete errors[field];
        break;
      case "lastName":
        if (!value.trim()) errors[field] = `Last Name is required`;
        else delete errors[field];
        break;
      case "password":
        const passError = validatePassword(value);
        if (passError) errors[field] = `Password is invalid`;
        else delete errors[field];
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
          errors.email = "Invalid email format";
        }else{
          delete errors.email;
        }
        break;
      case "mobile":
        if (!value.trim()) {
          errors.mobile = "Mobile number is required";
        } else if (!/^\d{10,}$/.test(value)) {
          errors.mobile = "Mobile number must be at least 10 digits";
        } else {
          delete errors.mobile;
        }
        break;
    }
  };

  const debouncedValidate = (field: string, value: string) => {
    if (debounceTimers[field]) {
      clearTimeout(debounceTimers[field]);
    }
    debounceTimers[field] = setTimeout(async() => {
      validateField(field, value);
      if(field === "email" && !errors.email){
        const { success, message } = await validateEmail();
        if(!success){
          errors.email = message;
        }
      }
    }, 300); // 300ms debounce time
  };

  const handleInput = async(event: Event, field: string) => {
    const target = event.target as HTMLInputElement;
    debouncedValidate(field, target.value);
  };

  const handleChange = async(event: Event, field: string) => {
    const target = event.target as HTMLInputElement;
    validateField(field, target.value);
  };

  const validateForm = async (): Promise<boolean> => {
    validateField("firstName", firstName);
    validateField("lastName", lastName);
    validateField("email", email);
    validateField("password", password);
    validateField("mobile", mobile);
    if( !errors.email || errors.email === ""){
      const { success, message } = await validateEmail(); 
      if(!success){
        errors.email = message;
      }
    }
    
    return Object.keys(errors).length === 0;
  };

  onMount(() => {
    validateForm();
    return () => {
      Object.values(debounceTimers).forEach(clearTimeout);
    };
  });
</script>

<div>
  <div class="flex justify-center mb-10 text-center">
    <Koredor />
  </div>
  <h1 class="mb-10 text-xl font-bold xl:text-2xl">Sign Up</h1>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <i class="fa-solid fa-id-card-clip"></i>
      <input
        placeholder="First Name"
        type="text"
        class="p-2 bg-white grow"
        autocomplete="off"
        name="firstName"
        id="firstName"
        bind:value={firstName}
        oninput={(e) => handleInput(e, "firstName")}
        onchange={(e) => handleChange(e, "firstName")}
      />
    </label>
    {#if errors.firstName}
      <span class="text-xs text-red-500">{errors.firstName}</span>
    {/if}
  </div>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <i class="fa-solid fa-id-card-clip"></i>
      <input
        placeholder="Last Name"
        type="text"
        class="p-2 bg-white grow"
        autocomplete="off"
        name="lastName"
        id="lastName"
        bind:value={lastName}
        oninput={(e) => handleInput(e, "lastName")}
        onchange={(e) => handleChange(e, "lastName")}
      />
    </label>
    {#if errors.lastName}
      <span class="text-xs text-red-500">{errors.lastName}</span>
    {/if}
  </div>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <i class="fa-solid fa-envelope"></i>
      <input
        placeholder="Email"
        type="email"
        class="p-2 bg-white grow"
        autocomplete="off"
        name="email"
        id="email"
        bind:value={email}
        oninput={(e) => handleInput(e, "email")}
        onchange={(e) => handleChange(e, "email")}
      />
    </label>
    {#if errors.email}
      <span class="text-xs text-red-500">{errors.email}</span>
    {/if}
  </div>
  <div class="mb-6">
    <label class="flex items-center gap-4 py-6 mt-5 input input-bordered">
      <i class="fa-solid fa-lock"></i>
      <input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        class="p-2 bg-white grow"
        autocomplete="off"
        name="hidden"
        id="hidden"
        bind:value={password}
        oninput={(e) => handleInput(e, "password")}
        onchange={(e) => handleChange(e, "pasword")}
      />
      <button onclick={togglePassword}>
        {#if showPassword}
          <i class="fa-solid fa-eye-slash"></i>
        {:else}
          <i class="fa-solid fa-eye"></i>
        {/if}
      </button>
    </label>

    <div class="p-2 text-xs">
      <ul class="text-green-500">
        <li class:text-red-500={!passwordCheck.passwordLength}>
          <i
            class={`fa-solid ${passwordCheck.passwordLength ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i>
          <span>At least 8 characters</span>
        </li>
        <li class:text-red-500={!passwordCheck.passwordUpper}>
          <i
            class={`fa-solid ${passwordCheck.passwordUpper ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 upper case alphabet (A-Z)
        </li>
        <li class:text-red-500={!passwordCheck.passwordLower}>
          <i
            class={`fa-solid ${passwordCheck.passwordLower ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 lower case alphabet (a-z)
        </li>
        <li class:text-red-500={!passwordCheck.passwordNumber}>
          <i
            class={`fa-solid ${passwordCheck.passwordNumber ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 number (0-9)
        </li>
        <li class:text-red-500={!passwordCheck.passwordSpecial}>
          <i
            class={`fa-solid ${passwordCheck.passwordSpecial ? "fa-circle-check" : "fa-circle-xmark"}`}
          ></i> At least 1 special character (!@#$%^&*()_+-=&#91;&#93;&#123;&#125;;':"\\|,./?+)
        </li>
      </ul>
    </div>
  </div>
  <div class="mb-6">
    <div class="w-full p-0 mt-5 text-xs text-right">
      Ex: 9170000001 or 9181111110
    </div>
    <label class="flex items-center gap-4 py-6 input input-bordered">
      <span class="text-xs">+63</span>
      <input
        placeholder="Mobile"
        name="mobile"
        id="mobile"
        required
        type="tel"
        bind:value={mobile}
        class="grow"
        oninput={(e) => handleInput(e, "mobile")}
        onchange={(e) => handleChange(e, "mobile")}
      />
    </label>
    {#if errors.mobile}
      <span class="text-xs text-red-500">{errors.mobile}</span>
    {/if}
  </div>
  <div class="mb-6 text-sm">
    By creating an account, you agree to the Terms of Service. For more
    information about Koredor's privacy practices, see the Koredor Privacy
    Statement. We'll occasionally send you account-related emails.
  </div>
  <button
    onclick={handleSignUp}
    class="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out bg-orange-500 rounded-lg hover:bg-orange-700 focus:shadow-outline focus:outline-none"
  >
    <i class="fa-solid fa-paper-plane"></i>
    <span class="ml-3">Sign Up</span></button
  >
</div>
