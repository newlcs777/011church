import clsx from "clsx";

const baseClasses = `
  inline-flex
  items-center
  justify-center
  gap-2
  rounded-xl
  px-4
  py-2.5
  text-sm
  font-medium
  tracking-wide
  transition-all
  duration-200
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const variants = {
  primary: `
    bg-primary
    text-primary-content
    shadow-md
    hover:bg-primary/90
  `,
  outline: `
    border
    border-base-300
    bg-base-100
    text-neutral
    hover:border-primary
    hover:text-primary
  `,
  ghost: `
    text-neutral/70
    hover:bg-base-200/70
  `,
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  full = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        full && "w-full sm:w-auto",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
