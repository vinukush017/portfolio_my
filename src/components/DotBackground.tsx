// components/GalaxyBackground.tsx
import React from "react";
import StarfieldCanvas from "./StarfieldCanvas";
import OrbitingCanvas from "./OrbitingCanvas";

const GalaxyBackground = () => (
  <>
    <StarfieldCanvas />
    <OrbitingCanvas />
  </>
);

export default GalaxyBackground;
