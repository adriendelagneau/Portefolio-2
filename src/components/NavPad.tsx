"use client";

import { BriefcaseBusiness, Coffee, Library } from "lucide-react";
import React from "react";
import { GiMonkey } from "react-icons/gi";

import useInteractionStore from "@/store/useInteractionStore";

const NavPad = () => {
  const { setClickedObject, isEntered } = useInteractionStore();

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 h-28 w-28 rounded-xl border-2 border-zinc-800 bg-zinc-950 p-2 transition-opacity duration-500 lg:h-32 lg:w-32 ${isEntered ? "pointer-events-auto opacity-100 delay-1500" : "pointer-events-none opacity-0"} `}
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 lg:gap-2">
        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation(); // 👈 Prevent window click handler from firing
            setClickedObject("Library");
          }}
        >
          <Library className="text-secondary-foreground h-6 w-6 transition lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
        </div>
        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation(); // 👈 Prevent window click handler from firing
            setClickedObject("Photos");
          }}
        >
          <BriefcaseBusiness size={24} className="text-secondary-foreground" />
        </div>
        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation(); // 👈 Prevent window click handler from firing
            setClickedObject("Mug");
          }}
        >
          <Coffee size={24} className="text-secondary-foreground" />
        </div>
        <div
          className="bg-card flex cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
          onClick={(e) => {
            e.stopPropagation(); // 👈 Prevent window click handler from firing
            setClickedObject("Monkey");
          }}
        >
          <GiMonkey size={32} className="text-secondary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default NavPad;
