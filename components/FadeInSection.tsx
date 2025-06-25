'use client'

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface FadeInSectionProps {
  /**
   * The element to render as. Defaults to a `div`.
   */
  as?: React.ElementType;
  /**
   * Child nodes that should fade into view.
   */
  children: React.ReactNode;
  /**
   * Additional classes to apply to the wrapper element.
   */
  className?: string;
  /**
   * Intersection Observer threshold – how much of the element should be visible before triggering the animation.
   */
  threshold?: number;
  /**
   * Whether the animation should only run the first time the element appears.
   */
  once?: boolean;
}

export default function FadeInSection({
  as: Component = "div",
  children,
  className,
  threshold = 0.2,
  once = true,
}: FadeInSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={clsx(
        "transition-all duration-700 ease-out",
        !isVisible && "opacity-0 translate-y-10",
        isVisible && "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </Component>
  );
} 