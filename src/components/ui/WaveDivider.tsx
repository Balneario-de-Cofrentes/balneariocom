/**
 * Organic wave shape divider between sections.
 * Place between sections to replace hard boundaries
 * with a flowing, water-inspired transition.
 */

interface WaveDividerProps {
  from?: "cream" | "white" | "charcoal";
  to?: "cream" | "white" | "charcoal";
  flip?: boolean;
}

const colors = {
  cream: "#faf8f3",
  white: "#ffffff",
  charcoal: "#2a2825",
};

export function WaveDivider({ from = "cream", to = "white", flip = false }: WaveDividerProps) {
  return (
    <div
      className={`relative -mt-px overflow-hidden ${flip ? "rotate-180" : ""}`}
      style={{ background: colors[from] }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 10 480 60 720 35C960 10 1200 55 1440 30V80H0V40Z"
          fill={colors[to]}
        />
      </svg>
    </div>
  );
}
