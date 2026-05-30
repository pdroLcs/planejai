import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHero } from "../components/shared/PageHero";
import { Button } from "../components/shared/Button";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import { calcMonthlySavings } from "../utils/simulation";
import type { SimulationRecord } from "../data/Simulation";

export function SimulationHistoryPage() {
  const { listSimulations, deleteSimulation } = useSimulationStorage();
  const [history, setHistory] = useState<SimulationRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(listSimulations());
  }, [listSimulations]);

  const handleDelete = (id: string) => {
    deleteSimulation(id);
    setHistory((previous) =>
      previous.filter((simulation) => simulation.id !== id),
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Veja os planos já salvos, exclua registros e acesse resultados com insights gerados."
      />

      {history.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Nenhuma simulação encontrada. Inicie uma nova simulação para ver o histórico aqui.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {history.map((simulation) => (
            <article
              key={simulation.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[4px_8px_20px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Meta
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">
                    {simulation.goalName}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    R$ {simulation.goalAmount} • {simulation.goalDeadline} meses
                  </p>
                </div>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${simulation.insight ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300"}`}
                >
                  {simulation.insight ? "Insight gerado" : "Aguardando insight"}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-secondary-button p-4">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Renda
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-foreground">
                    R$ {simulation.income}
                  </dd>
                </div>
                <div className="rounded-3xl bg-secondary-button p-4">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Despesas
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-foreground">
                    R$ {simulation.expenses}
                  </dd>
                </div>
                <div className="rounded-3xl bg-secondary-button p-4">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Economia
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-foreground">
                    R$ {calcMonthlySavings(simulation).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </dd>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="secondary"
                  onClick={() => void navigate(`/resultado/${simulation.id}`)}
                >
                  Ver detalhes
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(simulation.id)}
                >
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
