
export type StepStatus = "success" | "warning" | "error";

export interface StepItem {
  desc: string;
  status: "success" | "warning" | "error";
}

export type StepsMap = Record<string, StepItem[]>;


