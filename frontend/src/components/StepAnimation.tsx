// src/components/StepAnimation.tsx

import React from "react";
import { Box, Fade } from "@mui/material";
import { motion } from "framer-motion";
import type { StepItem } from "../types/steps";
import { BubbleBox } from "./CustomBox";

export interface StepWrapperProps {
  step: number;
  stepItems: StepItem[];
  children: React.ReactNode;
}

interface StepContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  isCurrentStep: boolean;
  color?: string; // default blue
}

interface SideBoxProps {
  stepItems: StepItem[]
  isBubbleLeft: boolean
}

interface ConnectionLineProps {
  color?: string;
}

// Step box with glow animation
export function StepContainer({
  children,
  isVisible,
  isCurrentStep,
  color = "44, 154, 245", // default blue in rgb
}: StepContainerProps) {
  return (
    <Fade in={isVisible} timeout={600}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#fafaffff",
            ...(isVisible && !isCurrentStep ? { border: `1px solid ${color}` } : {}),
            ...(isCurrentStep
              ? { boxShadow: `0 0 35px rgba(${color}, 0.45)` }
              : { boxShadow: `0 0 8px rgba(${color}, 0.25)` }
            ),
          }}
        >
          {children}
        </Box>
      </motion.div>
    </Fade>
  );
}

// Vertical line between steps
export function ConnectionLine({ color = "144, 202, 249" }: ConnectionLineProps) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "10vh" }}
      transition={{ duration: 0.6 }}
      style={{
        width: 2,
        background: `rgba(${color}, 1)`,
        margin: "0 auto",
        borderRadius: 2,
      }}
    />
  );
}

export function StepWrapper({ step, stepItems, children }: StepWrapperProps) {
    
  const isOdd = step % 2 === 1;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor:'red',
                gap: 4,
                width: "100%"
            }}
        >
            {isOdd ? <SideBox stepItems={stepItems} isBubbleLeft={isOdd}/> : <EmptyBox />}

            <MiddleBox>{children}</MiddleBox>

            {!isOdd ? <SideBox stepItems={stepItems} isBubbleLeft={isOdd} /> : <EmptyBox />}
        </Box>
    );
}

export const SideBox: React.FC<SideBoxProps> = ({ stepItems, isBubbleLeft }) => {
  if (!stepItems) return null;

  return (
    <Box>

      {stepItems.map((si, index) => (
        <>
        <BubbleBox key={index} text={si.desc} status={si.status} isLeft={isBubbleLeft} />
        <br></br>
        </>
      ))}
    </Box>
  );
};


function EmptyBox() {
    return <Box sx={{ width: "20%",  minWidth: 120, p:2 }}></Box>;
}

function MiddleBox({ children }: { children: React.ReactNode }) {
    return (
      <Box sx={{ width: "50%" }} >{children}</Box>
    );
}