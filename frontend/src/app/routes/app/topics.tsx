import TopicSelection from '@/features/interest-topics/components/TopicsSelection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0f0e17] text-white p-4">
      <TopicSelection />
    </main>
  );
}
