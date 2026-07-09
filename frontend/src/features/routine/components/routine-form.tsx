import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useTopics } from '@/features/interest-topics/api/get-topics';
import { Topic } from '@/types/api';

import { useCreateRoutine } from '../api/create-routine';

const WEEK_DAYS = [
  { value: 'monday', label: 'Segunda' },
  { value: 'tuesday', label: 'Terça' },
  { value: 'wednesday', label: 'Quarta' },
  { value: 'thursday', label: 'Quinta' },
  { value: 'friday', label: 'Sexta' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
];

export function RoutineForm() {
  const { data: topics = [] } = useTopics();
  const { mutateAsync: createRoutine, isPending } = useCreateRoutine();
  const navigate = useNavigate();

  const [weekDay, setWeekDay] = useState('monday');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [topicId, setTopicId] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!topicId) {
      setError('Selecione um tópico.');
      return;
    }
    if (startTime >= endTime) {
      setError('O horário de início deve ser antes do horário de fim.');
      return;
    }
    setError('');
    await createRoutine({
      topic: topicId,
      week_day: weekDay,
      start_time: `${startTime}:00`,
      end_time: `${endTime}:00`,
    });
    navigate(paths.app.home.getHref());
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-2">Configure sua rotina</h1>
        <p className="text-zinc-400 mb-8">
          Defina quando você quer ver cada tipo de conteúdo. Você pode adicionar mais depois.
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Tópico</label>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="">Selecione um tópico</option>
              {topics.map((t: Topic) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Dia da semana</label>
            <div className="grid grid-cols-4 gap-2">
              {WEEK_DAYS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setWeekDay(d.value)}
                  className={`rounded-lg py-2 text-xs font-medium transition-all ${
                    weekDay === d.value
                      ? 'bg-white text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Início</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Fim</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            onClick={handleSave}
            disabled={isPending}
            className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold py-3 mt-2"
          >
            {isPending ? 'Salvando...' : 'Salvar e Entrar'}
          </Button>

          <button
            onClick={() => navigate(paths.app.home.getHref())}
            className="text-center text-sm text-zinc-500 hover:text-zinc-300"
          >
            Pular por agora
          </button>
        </div>
      </div>
    </div>
  );
}
