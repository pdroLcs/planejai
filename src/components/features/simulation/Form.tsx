import { StepProgress } from "./Progress";

export function SimulationForm() {
  return (
    <>
      <StepProgress currestStep={1} totalSteps={6}/>
    </>
  );
}