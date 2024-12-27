import  { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedImageProps {
  src: string;
  alt: string;
}

const AnimatedImage = ({ src, alt }: AnimatedImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    
    // Bubble animation
    tl.to(imageRef.current, {
      y: -20,
      duration: 2,
      ease: "power1.inOut"
    })
    .to(imageRef.current, {
      y: 0,
      duration: 2,
      ease: "power1.inOut"
    });

    // Border animation
    gsap.to(borderRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-[400px] h-[400px]" ref={imageRef}>
      <div className="absolute inset-0" ref={borderRef}>
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <clipPath id="clip-path">
              <circle cx="200" cy="200" r="190" />
            </clipPath>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            className="animate-dash"
          />
        </svg>
      </div>
      <div className="absolute inset-0">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
          style={{ clipPath: "url(#clip-path)" }}
        />
      </div>
    </div>
  );
};

export default AnimatedImage;