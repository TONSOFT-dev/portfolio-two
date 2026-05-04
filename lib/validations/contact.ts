export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Email validation regex - more robust pattern
// Validates: local-part@domain.tld
// Local part: alphanumeric, dots, underscores, hyphens, plus signs
// Domain: alphanumeric, dots, hyphens
// TLD: at least 2 letters
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex (allows digits, spaces, dashes, plus, parentheses)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

export function validateFirstName(firstName: string): string | undefined {
  const trimmed = firstName.trim();
  if (!trimmed) {
    return "First name is required";
  }
  if (trimmed.length < 2) {
    return "First name must be at least 2 characters";
  }
  if (trimmed.length > 50) {
    return "First name must not exceed 50 characters";
  }
  return undefined;
}

export function validateLastName(lastName: string): string | undefined {
  const trimmed = lastName.trim();
  if (!trimmed) {
    return "Last name is required";
  }
  if (trimmed.length < 2) {
    return "Last name must be at least 2 characters";
  }
  if (trimmed.length > 50) {
    return "Last name must not exceed 50 characters";
  }
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();

  // Check if email is empty
  if (!trimmed) {
    return "Email is required";
  }

  // Check minimum length (a@b.co = 6 characters minimum)
  if (trimmed.length < 6) {
    return "Email must be at least 6 characters";
  }

  // Check maximum length (RFC 5321 limit is 320 characters, but we use 100 for practical purposes)
  if (trimmed.length > 100) {
    return "Email must not exceed 100 characters";
  }

  // Check for @ symbol
  if (!trimmed.includes("@")) {
    return "Email must contain @ symbol";
  }

  // Split email into local and domain parts
  const parts = trimmed.split("@");

  // Check for exactly one @ symbol
  if (parts.length !== 2) {
    return "Email must contain exactly one @ symbol";
  }

  const [localPart, domain] = parts;

  // Validate local part (before @)
  if (!localPart || localPart.length === 0) {
    return "Email local part (before @) cannot be empty";
  }

  if (localPart.length > 64) {
    return "Email local part (before @) must not exceed 64 characters";
  }

  // Check for consecutive dots in local part
  if (localPart.includes("..")) {
    return "Email cannot contain consecutive dots";
  }

  // Check for leading/trailing dots in local part
  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return "Email local part cannot start or end with a dot";
  }

  // Validate domain part (after @)
  if (!domain || domain.length === 0) {
    return "Email domain (after @) cannot be empty";
  }

  if (domain.length > 253) {
    return "Email domain (after @) must not exceed 253 characters";
  }

  // Check for consecutive dots in domain
  if (domain.includes("..")) {
    return "Email domain cannot contain consecutive dots";
  }

  // Check for leading/trailing dots or hyphens in domain
  if (
    domain.startsWith(".") ||
    domain.endsWith(".") ||
    domain.startsWith("-") ||
    domain.endsWith("-")
  ) {
    return "Email domain cannot start or end with a dot or hyphen";
  }

  // Check for TLD (top-level domain) - must have at least one dot and valid TLD
  if (!domain.includes(".")) {
    return "Email domain must contain a top-level domain (e.g., .com, .org)";
  }

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];

  // Validate TLD
  if (!tld || tld.length < 2) {
    return "Email must have a valid top-level domain (at least 2 characters)";
  }

  if (!/^[a-zA-Z]+$/.test(tld)) {
    return "Email top-level domain must contain only letters";
  }

  // Final regex validation
  if (!emailRegex.test(trimmed)) {
    return "Invalid email address format";
  }

  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) {
    return "Phone number is required";
  }
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return "Phone number must be at least 10 digits";
  }
  if (trimmed.length > 20) {
    return "Phone number must not exceed 20 characters";
  }
  if (!phoneRegex.test(trimmed)) {
    return "Phone number contains invalid characters";
  }
  return undefined;
}

export function validateMessage(message: string): string | undefined {
  const trimmed = message.trim();
  if (!trimmed) {
    return "Message is required";
  }
  if (trimmed.length < 10) {
    return "Message must be at least 10 characters";
  }
  if (trimmed.length > 1000) {
    return "Message must not exceed 1000 characters";
  }
  return undefined;
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  const firstNameError = validateFirstName(data.firstName);
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateLastName(data.lastName);
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  return errors;
}

export function sanitizeContactFormData(
  data: ContactFormData
): ContactFormData {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
  };
}
