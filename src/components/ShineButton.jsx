import "../styles/ShineButton.css";

export default function ShineButton({ children, ...props }) {
  return (
    <button type="button" className="small-shine-btn" {...props}>
      {children}
    </button>
  );
}
