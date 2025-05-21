"use client"
import { Player } from '@lottiefiles/react-lottie-player';
type CardAnimationLoadingProps = {
  className?: string;
};
export const CardAnimationLoading = ({ className }: CardAnimationLoadingProps) => {
  return (
    <Player
      autoplay
      loop
      src="/card-animation-loading.json"
      className={className}
    />
  );
};
