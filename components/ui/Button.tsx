import { cn } from "@/lib/utils";
import Link from "next/link";
import Flip3DText from "@/components/animations/Flip3DText";
import Flip3D from "@/components/animations/Flip3D";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "rounded-outline"
    | "transparent";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  arrowBgColor?: string;
  arrowBgClassName?: string;
  size?: "default" | "large";
}

export default function Button({
  children,
  href,
  variant = "primary",
  showArrow = true,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  bgColor,
  textColor,
  borderColor,
  arrowBgColor,
  arrowBgClassName,
  size = "default",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-between gap-4 px-1 py-1 text-base leading-6 text-pure font-normal h-12 rounded-xl transition-all duration-300 group cursor-pointer";

  const sizeStyles = {
    default: "",
    large: "lg:text-[18px]",
  };

  const variants = {
    primary: "bg-solis text-noir border border-pure hover:bg-solis/90",
    secondary: "bg-pure text-noir border border-pure hover:bg-pearl",
    outline: "border border-pure text-pure hover:bg-pure hover:text-noir",
    "rounded-outline": "border border-pure text-pure",
    transparent:
      "bg-transparent border border-pure hover:border-none sm:border-none text-noir sm:text-pure",
  };

  // Custom styles override
  const customStyles = {
    backgroundColor: bgColor,
    color: textColor,
    borderColor: borderColor,
  };

  const textSizeClass = size === "large" ? "lg:text-[18px]" : "";
  const arrowContainerSizeClass = size === "large" ? "lg:w-6 lg:h-6" : "";
  const arrowIconSizeClass = size === "large" ? "lg:w-6 lg:h-6" : "";

  const content = (
    <>
      <Flip3DText
        defaultContent={
          <span
            className={`whitespace-nowrap pl-3 flex items-center ${textSizeClass}`}
          >
            {children}
          </span>
        }
        hoverContent={
          <span
            className={`whitespace-nowrap pl-3 flex items-center ${textSizeClass}`}
          >
            {children}
          </span>
        }
        axis="x"
        duration={0.6}
        useGroupHover={true}
        className=""
      />
      {showArrow && (
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg transition-transform duration-300",
            arrowContainerSizeClass,
            variant === "transparent"
              ? "bg-pure sm:bg-transparent text-noir sm:text-pure border border-pure hover:border-none sm:border-none"
              : arrowBgClassName
              ? arrowBgClassName
              : arrowBgColor
              ? ""
              : "bg-pure"
          )}
          style={
            arrowBgColor && !arrowBgClassName
              ? { backgroundColor: arrowBgColor }
              : undefined
          }
        >
          <Flip3D
            defaultImage="/images/svg-icons/arrow-right-icon.svg"
            hoverImage="/images/svg-icons/arrow-right-icon.svg"
            alt="Arrow"
            width={20}
            height={20}
            axis="y"
            duration={0.6}
            useGroupHover={true}
            className={cn(
              "w-5 h-5",
              arrowIconSizeClass,
              variant === "transparent" ? "brightness-0 sm:invert" : ""
            )}
          />
        </div>
      )}
    </>
  );

  const appliedClassName = cn(
    baseStyles,
    variants[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={appliedClassName}
        style={bgColor || textColor || borderColor ? customStyles : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={appliedClassName}
      style={bgColor || textColor || borderColor ? customStyles : undefined}
    >
      {content}
    </button>
  );
}
