import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Typography } from '../atoms/Typography';

interface StepContentProps {
  title: string;
  description: React.ReactNode;
  image?: React.ReactNode;
}

export const StepContent: React.FC<StepContentProps> = ({ title, description, image }) => {
  const container = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const textWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(container.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.2 }
    );

    if (imageWrapper.current) {
      tl.fromTo(imageWrapper.current,
        { scale: 0.8, opacity: 0, y: 50, rotation: -5 },
        { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.5 }
      );
      
      gsap.to(imageWrapper.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });
    }

    if (textWrapper.current) {
      tl.fromTo(textWrapper.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
        "-=0.3"
      );
    }
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col items-center text-center space-y-4 max-w-sm mx-auto opacity-0">
      {image && (
        <div 
          ref={imageWrapper}
          className="w-32 h-32 glass-card rounded-full flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
          <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
            {image}
          </div>
        </div>
      )}
      <div ref={textWrapper} className="space-y-4">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="body" className="max-w-xs mx-auto">
          {description}
        </Typography>
      </div>
    </div>
  );
};
