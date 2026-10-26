function Button({ variant = "default", className = "", ...props }) {
  const base = "cursor-pointer rounded-lg text-sm font-medium transition";

  const variants = {
    default:
      "ease-in-out px-6 py-2 delay-50 bg-primary text-background hover:bg-primary/90 hover:scale-105",
    save: "border border-primary px-3 py-1 bg-surface text-primary hover:bg-primary hover:text-surface",
    cancel:
      "border border-border px-3 py-1 text-text bg-surface hover:bg-slate-200",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export default Button;
