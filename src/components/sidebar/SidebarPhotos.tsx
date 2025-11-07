"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject, photoObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";
import { textSplitter } from "@/utils/textSplitter";

import { Button } from "../ui/button";

interface SidebarPhotosProps {
  object: InteractiveObject;
}

const SidebarPhotos: React.FC<SidebarPhotosProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const { setHoveredObject } = useInteractionStore();

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const underlineEl = underlineRef.current;
      const textSpans =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");
      const buttons =
        containerRef.current.querySelectorAll<HTMLElement>("button.photo-btn");

      const tl = gsap.timeline({ delay: 0.5 });

      // Underline animation
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Text animation
      if (textSpans.length) {
        tl.fromTo(
          textSpans,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      // Button animation
      tl.fromTo(
        buttons,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.3,
          ease: "power3.out",
        },
        "+=0.2"
      );
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div ref={containerRef} className="mt-4 flex flex-col gap-4">
      {/* Title with animated underline */}
      <h2 className="sidebar-title inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span bg-primary block h-px origin-left scale-x-0"
          ></span>
        </span>
      </h2>

      {/* Animated text */}
      {object.text && (
        <p className="text-xl opacity-90">{textSplitter(object.text)}</p>
      )}

      {/* Full-width animated buttons with links */}
      <div className="flex flex-col gap-2 pt-2">
        {photoObjects.map((photo, index) => (
          <Button
            key={index}
            onMouseEnter={() => setHoveredObject(photo.name)}
            onMouseLeave={() => setHoveredObject(null)}
            className="photo-btn w-full"
          >
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center"
            >
              {photo.name} — {photo.websiteName}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SidebarPhotos;
