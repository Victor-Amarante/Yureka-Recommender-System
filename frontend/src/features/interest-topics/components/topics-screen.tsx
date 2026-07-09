import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { Topic } from '@/types/api';

import { useSaveTopics } from '../api/save-topics';
import { useTopics } from '../api/get-topics';

export function TopicsScreen() {
  const { data: topics = [], isLoading } = useTopics();
  const { mutateAsync: saveTopics, isPending } = useSaveTopics();
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleContinue = async () => {
    if (selected.length === 0) return;
    await saveTopics(selected);
    navigate(paths.onboarding.routine.getHref());
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        Carregando tópicos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2">Quais são seus interesses?</h1>
        <p className="text-zinc-400 mb-8">Selecione pelo menos um tópico para continuar.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {topics.map((topic: Topic) => {
            const active = selected.includes(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => toggle(topic.id)}
                className={`rounded-xl border px-4 py-4 text-left transition-all ${
                  active
                    ? 'border-white bg-white text-zinc-950 font-semibold'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500'
                }`}
              >
                <span className="text-sm">{topic.name}</span>
                {topic.description && (
                  <p className={`text-xs mt-1 ${active ? 'text-zinc-600' : 'text-zinc-500'}`}>
                    {topic.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
        <Button
          onClick={handleContinue}
          disabled={selected.length === 0 || isPending}
          className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold py-3"
        >
          {isPending ? 'Salvando...' : `Continuar (${selected.length} selecionados)`}
        </Button>
      </div>
    </div>
  );
}
