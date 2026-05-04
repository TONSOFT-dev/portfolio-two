"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import Loader from "@/components/ui/Loader";
import {
  ContactFormData,
  ValidationErrors,
  sanitizeContactFormData,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateMessage,
} from "@/lib/validations/contact";

type FieldName = keyof ContactFormData;
type FieldType = "text" | "email" | "tel" | "textarea";

interface FieldConfig {
  name: FieldName;
  type: FieldType;
  placeholder: string;
  validationFn: (value: string) => string | undefined;
  rows?: number;
  customClassName?: string;
}

const fieldConfigs: FieldConfig[] = [
  {
    name: "firstName",
    type: "text",
    placeholder: "Your First Name",
    validationFn: validateFirstName,
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Your Last Name",
    validationFn: validateLastName,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Your Email Address",
    validationFn: validateEmail,
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Your Phone Number",
    validationFn: validatePhone,
  },
  {
    name: "message",
    type: "textarea",
    placeholder: "Write Your Message Here...",
    validationFn: validateMessage,
    rows: 6,
    customClassName:
      "min-h-[150px] max-h-[220px] resize-y overflow-y-auto pl-4 sm:pl-5 pr-2 sm:pr-3 custom-scrollbar",
  },
];

const baseInputClassName =
  "w-full h-12 sm:h-14 md:h-14 lg:h-12 xl:h-14 px-4 sm:px-5 py-3 text-sm sm:text-base bg-coal text-pure rounded-xl border focus:outline-none focus:border-solis transition-colors placeholder:text-slate/50";
const errorInputClassName = "border-blaze";
const normalInputClassName = "border-slate/30 hover:border-solis";
const errorTextClassName = "mt-1 text-xs sm:text-sm text-blaze";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateField = (
    name: FieldName,
    value: string
  ): string | undefined => {
    const fieldConfig = fieldConfigs.find((config) => config.name === name);
    return fieldConfig ? fieldConfig.validationFn(value) : undefined;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
    setTouched({});
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast({ type: null, message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(name as FieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeToast();

    // Validate all fields one by one
    const validationErrors: ValidationErrors = {};
    const allTouched: Record<string, boolean> = {};

    for (const fieldConfig of fieldConfigs) {
      const value = formData[fieldConfig.name];
      const error = fieldConfig.validationFn(value);

      if (error) {
        validationErrors[fieldConfig.name] = error;
      }

      allTouched[fieldConfig.name] = true;
    }

    setErrors(validationErrors);
    setTouched(allTouched);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error field
      const firstErrorField = Object.keys(validationErrors)[0] as FieldName;
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`
      );
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement).focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitizedData = sanitizeContactFormData(formData);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        // Reset form after successful submission
        resetForm();
        // Show success toast
        showToast(
          "success",
          result.message ||
            "Thank you for your message! We'll get back to you soon."
        );
      } else {
        // Show error toast
        showToast(
          "error",
          result.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Show error toast
      showToast(
        "error",
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldConfig: FieldConfig) => {
    const { name, type, placeholder, rows, customClassName } = fieldConfig;
    const value = formData[name];
    const error = errors[name];
    const isTouched = touched[name];
    const hasError = error && isTouched;

    const inputClassName = `${baseInputClassName} ${
      hasError ? errorInputClassName : normalInputClassName
    } ${customClassName || ""}`;

    const commonProps = {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      placeholder,
      required: true,
      className: inputClassName,
    };

    const isTextarea = type === "textarea";

    return (
      <div key={name}>
        {isTextarea ? (
          <textarea
            {...commonProps}
            rows={rows}
            style={{ scrollbarGutter: "stable" }}
          />
        ) : (
          <input {...commonProps} type={type} />
        )}
        {error && isTouched && <p className={errorTextClassName}>{error}</p>}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative pb-5 p-4 sm:p-4 md:p-6 lg:p-8 xl:p-10 rounded-3xl bg-coal/40 backdrop-blur-xl border border-white/10 shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-linear-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:z-0 after:absolute after:inset-0 after:rounded-3xl after:bg-linear-to-t after:from-transparent after:to-white/2 after:pointer-events-none after:z-0"
    >
      <div className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-5 xl:space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-4 xl:gap-6">
          {fieldConfigs.slice(0, 2).map((config) => renderField(config))}
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-4 xl:gap-6">
          {fieldConfigs.slice(2, 4).map((config) => renderField(config))}
        </div>

        {/* Message Field */}
        <div className="pt-0 sm:pt-1 md:pt-2">
          {renderField(fieldConfigs[4])}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="outline"
            disabled={isSubmitting}
            className="text-solis border-solis hover:bg-transparent hover:text-solis w-full text-sm sm:text-base md:text-lg lg:text-lg relative"
            arrowBgClassName="bg-solis"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" />
                <span>Sending...</span>
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>

        {/* Toast Notification */}
        {toast.type && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
            duration={toast.type === "success" ? 5000 : 6000}
          />
        )}
      </div>
    </form>
  );
}
