"use client"
import { Player } from '@lottiefiles/react-lottie-player';
type AnimationLoadingProps = {
  className?: string;
};
export const AnimationLoading = ({ className }: AnimationLoadingProps) => {
  return (
    <Player
      autoplay
      loop
      src="/animation-loading.json"
      className={className}
    />
  );
};
