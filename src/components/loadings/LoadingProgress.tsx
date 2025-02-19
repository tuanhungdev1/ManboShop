import { useNProgress } from "@tanem/react-nprogress";

interface LoadingProgressBarProps {
  isAnimating: boolean;
}

export default function LoadingProgress({
  isAnimating,
}: LoadingProgressBarProps) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <>
      <div
        style={{
          opacity: isFinished ? 0 : 1,
          pointerEvents: "none",
          transition: `opacity ${animationDuration}ms linear`,
        }}
      >
        <div
          style={{
            background: "#1976d2",
            height: 2,
            left: 0,
            marginLeft: `${(-1 + progress) * 100}%`,
            position: "fixed",
            top: 0,
            transition: `margin-left ${animationDuration}ms linear`,
            width: "100%",
            zIndex: 1031,
          }}
        >
          <div
            style={{
              boxShadow: "0 0 10px #1976d2, 0 0 5px #1976d2",
              display: "block",
              height: "100%",
              opacity: 1,
              position: "absolute",
              right: 0,
              transform: "rotate(3deg) translate(0px, -4px)",
              width: 100,
            }}
          />
        </div>
      </div>
    </>
  );
}
