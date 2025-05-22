"use client"
import { Player } from '@lottiefiles/react-lottie-player';
type EmptyStateProps = {
  className?: string;
};
export const EmptyState = ({ className }: EmptyStateProps) => {
  return (
    <Player
      autoplay
      loop
      src="/animation-empty-state.json"
      className={className}
    />
  );
};
