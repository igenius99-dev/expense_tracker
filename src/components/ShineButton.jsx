import "../styles/ShineButton.css";

export default function ShineButton({ children, className, ...props }) {
  return (
    <button type="button" className={`small-shine-btn ${className}`} {...props}>
      {children}
    </button>
  );
}
