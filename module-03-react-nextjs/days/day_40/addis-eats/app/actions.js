"use server";

export async function placeOrder(previousState, formData) {
  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();

  const errors = {};

  if (!name || name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!phone || !/^09\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  console.log("Order received:", {
    name,
    phone,
    total: 350,
  });

  return {
    success: true,
    errors: {},
  };
}
