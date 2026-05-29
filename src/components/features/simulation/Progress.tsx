interface StepProgressProps {
  currestStep: number
  totalSteps: number
};

export function StepProgress({currestStep, totalSteps}: StepProgressProps) {

  const progress = (currestStep / totalSteps) * 100;

  return (
    <div className="mb-4">
      <p className="text-muted-foreground mb-2 text-sm">
        Passo {currestStep} de {totalSteps}
      </p>
      <div className="bg-border h-1 w-full overflow-hidden rounded-full">
        <div
          role="progressbar"
          aria-valuenow={currestStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Passo ${currestStep} de ${totalSteps}`}
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{width: `${progress}%`}}
        />
      </div>
    </div>
  );
}