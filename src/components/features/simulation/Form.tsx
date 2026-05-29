import { PiggyBank } from "lucide-react";
import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";
import { simulationFormSteps } from "../../../data/Simulation";

export function SimulationForm() {

  const currestStep = simulationFormSteps[0];

  return (
    <>
      <StepProgress currestStep={1} totalSteps={6}/>
      <FormStep key={currestStep.id} {...currestStep}/>
    </>
  );
}