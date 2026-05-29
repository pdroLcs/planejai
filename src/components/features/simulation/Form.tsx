import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";
import { simulationFormSteps } from "../../../data/Simulation";
import { useState } from "react";

export function SimulationForm() {

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = simulationFormSteps.length;
  const currestStep = simulationFormSteps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex + 1 > totalSteps - 1) return;

    setCurrentStepIndex(prev => prev + 1);
  }

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) return;

    setCurrentStepIndex(prev => prev - 1);
  }

  return (
    <>
      <StepProgress currestStep={currentStepIndex + 1} totalSteps={totalSteps}/>
      <FormStep key={currestStep.id} {...currestStep} onBack={handlePreviousStep} onNext={handleNextStep} hideBackButton={currentStepIndex === 0}/>
    </>
  );
}