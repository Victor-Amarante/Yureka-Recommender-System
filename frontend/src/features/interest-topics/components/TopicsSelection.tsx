import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';

type Topic = {
  id: string;
  name: string;
  related: string[];
};

const topicsData: Record<string, Topic> = {
  database: {
    id: 'database',
    name: 'database',
    related: ['sql', 'nosql', 'postgres'],
  },
  rust: {
    id: 'rust',
    name: 'rust',
    related: ['systems', 'wasm', 'performance'],
  },
  java: {
    id: 'java',
    name: 'java',
    related: ['spring', 'android', 'enterprise'],
  },
  elixir: {
    id: 'elixir',
    name: 'elixir',
    related: ['phoenix', 'functional', 'erlang'],
  },
  devops: {
    id: 'devops',
    name: 'devops',
    related: ['ci-cd', 'kubernetes', 'docker'],
  },
  webdev: {
    id: 'webdev',
    name: 'webdev',
    related: ['frontend', 'backend', 'fullstack'],
  },
  python: {
    id: 'python',
    name: 'python',
    related: ['django', 'flask', 'data-analysis'],
  },
  tools: { id: 'tools', name: 'tools', related: ['git', 'vscode', 'terminal'] },
  golang: {
    id: 'golang',
    name: 'golang',
    related: ['backend', 'performance', 'concurrency'],
  },
  crypto: {
    id: 'crypto',
    name: 'crypto',
    related: ['blockchain', 'web3', 'nft'],
  },
  dotnet: {
    id: 'dotnet',
    name: '.net',
    related: ['csharp', 'azure', 'windows'],
  },
  mobile: {
    id: 'mobile',
    name: 'mobile',
    related: ['ios', 'android', 'react-native'],
  },
  react: {
    id: 'react',
    name: 'react',
    related: ['frontend', 'nextjs', 'redux'],
  },
  ai: {
    id: 'ai',
    name: 'ai',
    related: ['machine-learning', 'deep-learning', 'nlp'],
  },
  'machine-learning': {
    id: 'machine-learning',
    name: 'machine-learning',
    related: ['ai', 'data-science', 'tensorflow'],
  },
  cloud: { id: 'cloud', name: 'cloud', related: ['aws', 'azure', 'gcp'] },
  gaming: {
    id: 'gaming',
    name: 'gaming',
    related: ['unity', 'unreal', 'gamedev'],
  },
  'tech-news': {
    id: 'tech-news',
    name: 'tech-news',
    related: ['startups', 'industry', 'trends'],
  },
  ruby: { id: 'ruby', name: 'ruby', related: ['rails', 'sinatra', 'gems'] },
  architecture: {
    id: 'architecture',
    name: 'architecture',
    related: ['microservices', 'design-patterns', 'system-design'],
  },
  javascript: {
    id: 'javascript',
    name: 'javascript',
    related: ['typescript', 'nodejs', 'frontend'],
  },
  'data-science': {
    id: 'data-science',
    name: 'data-science',
    related: ['python', 'r', 'statistics'],
  },
  testing: {
    id: 'testing',
    name: 'testing',
    related: ['unit-testing', 'e2e', 'qa'],
  },
  security: {
    id: 'security',
    name: 'security',
    related: ['cybersecurity', 'pentesting', 'encryption'],
  },
  'open-source': {
    id: 'open-source',
    name: 'open-source',
    related: ['github', 'community', 'contributions'],
  },
  sql: { id: 'sql', name: 'sql', related: ['postgres', 'mysql', 'database'] },
  nosql: {
    id: 'nosql',
    name: 'nosql',
    related: ['mongodb', 'redis', 'database'],
  },
  postgres: {
    id: 'postgres',
    name: 'postgres',
    related: ['sql', 'database', 'backend'],
  },
  systems: {
    id: 'systems',
    name: 'systems',
    related: ['rust', 'c', 'performance'],
  },
  wasm: {
    id: 'wasm',
    name: 'wasm',
    related: ['rust', 'javascript', 'performance'],
  },
  performance: {
    id: 'performance',
    name: 'performance',
    related: ['optimization', 'rust', 'golang'],
  },
  spring: {
    id: 'spring',
    name: 'spring',
    related: ['java', 'enterprise', 'backend'],
  },
  android: {
    id: 'android',
    name: 'android',
    related: ['java', 'kotlin', 'mobile'],
  },
  enterprise: {
    id: 'enterprise',
    name: 'enterprise',
    related: ['java', 'spring', 'architecture'],
  },
  phoenix: {
    id: 'phoenix',
    name: 'phoenix',
    related: ['elixir', 'web', 'backend'],
  },
  functional: {
    id: 'functional',
    name: 'functional',
    related: ['elixir', 'haskell', 'fp'],
  },
  erlang: {
    id: 'erlang',
    name: 'erlang',
    related: ['elixir', 'beam', 'distributed'],
  },
  'ci-cd': {
    id: 'ci-cd',
    name: 'ci-cd',
    related: ['devops', 'automation', 'github-actions'],
  },
  kubernetes: {
    id: 'kubernetes',
    name: 'kubernetes',
    related: ['devops', 'docker', 'cloud'],
  },
  docker: {
    id: 'docker',
    name: 'docker',
    related: ['devops', 'containers', 'kubernetes'],
  },
  frontend: {
    id: 'frontend',
    name: 'frontend',
    related: ['react', 'vue', 'webdev'],
  },
  backend: {
    id: 'backend',
    name: 'backend',
    related: ['nodejs', 'python', 'webdev'],
  },
  fullstack: {
    id: 'fullstack',
    name: 'fullstack',
    related: ['frontend', 'backend', 'webdev'],
  },
  django: {
    id: 'django',
    name: 'django',
    related: ['python', 'backend', 'web'],
  },
  flask: { id: 'flask', name: 'flask', related: ['python', 'backend', 'web'] },
  'data-analysis': {
    id: 'data-analysis',
    name: 'data-analysis',
    related: ['python', 'pandas', 'data-science'],
  },
  git: {
    id: 'git',
    name: 'git',
    related: ['tools', 'github', 'version-control'],
  },
  vscode: {
    id: 'vscode',
    name: 'vscode',
    related: ['tools', 'editor', 'extensions'],
  },
  terminal: {
    id: 'terminal',
    name: 'terminal',
    related: ['tools', 'bash', 'cli'],
  },
  concurrency: {
    id: 'concurrency',
    name: 'concurrency',
    related: ['golang', 'rust', 'performance'],
  },
  blockchain: {
    id: 'blockchain',
    name: 'blockchain',
    related: ['crypto', 'web3', 'ethereum'],
  },
  web3: {
    id: 'web3',
    name: 'web3',
    related: ['crypto', 'blockchain', 'dapps'],
  },
  nft: {
    id: 'nft',
    name: 'nft',
    related: ['crypto', 'blockchain', 'digital-art'],
  },
  csharp: { id: 'csharp', name: 'c#', related: ['dotnet', 'unity', 'windows'] },
  azure: {
    id: 'azure',
    name: 'azure',
    related: ['cloud', 'dotnet', 'microsoft'],
  },
  windows: {
    id: 'windows',
    name: 'windows',
    related: ['dotnet', 'microsoft', 'desktop'],
  },
  ios: { id: 'ios', name: 'ios', related: ['mobile', 'swift', 'apple'] },
  'react-native': {
    id: 'react-native',
    name: 'react-native',
    related: ['mobile', 'react', 'cross-platform'],
  },
  nextjs: {
    id: 'nextjs',
    name: 'nextjs',
    related: ['react', 'frontend', 'ssr'],
  },
  redux: {
    id: 'redux',
    name: 'redux',
    related: ['react', 'state-management', 'frontend'],
  },
  'deep-learning': {
    id: 'deep-learning',
    name: 'deep-learning',
    related: ['ai', 'neural-networks', 'machine-learning'],
  },
  nlp: {
    id: 'nlp',
    name: 'nlp',
    related: ['ai', 'language', 'machine-learning'],
  },
  tensorflow: {
    id: 'tensorflow',
    name: 'tensorflow',
    related: ['machine-learning', 'python', 'ai'],
  },
  aws: { id: 'aws', name: 'aws', related: ['cloud', 'serverless', 's3'] },
  gcp: { id: 'gcp', name: 'gcp', related: ['cloud', 'google', 'kubernetes'] },
  unity: {
    id: 'unity',
    name: 'unity',
    related: ['gaming', 'csharp', 'gamedev'],
  },
  unreal: {
    id: 'unreal',
    name: 'unreal',
    related: ['gaming', 'cpp', 'gamedev'],
  },
  gamedev: {
    id: 'gamedev',
    name: 'gamedev',
    related: ['gaming', 'unity', 'unreal'],
  },
  startups: {
    id: 'startups',
    name: 'startups',
    related: ['tech-news', 'entrepreneurship', 'venture-capital'],
  },
  industry: {
    id: 'industry',
    name: 'industry',
    related: ['tech-news', 'business', 'trends'],
  },
  trends: {
    id: 'trends',
    name: 'trends',
    related: ['tech-news', 'future', 'innovation'],
  },
  rails: { id: 'rails', name: 'rails', related: ['ruby', 'web', 'backend'] },
  sinatra: {
    id: 'sinatra',
    name: 'sinatra',
    related: ['ruby', 'web', 'lightweight'],
  },
  gems: {
    id: 'gems',
    name: 'gems',
    related: ['ruby', 'packages', 'libraries'],
  },
  microservices: {
    id: 'microservices',
    name: 'microservices',
    related: ['architecture', 'distributed', 'cloud'],
  },
  'design-patterns': {
    id: 'design-patterns',
    name: 'design-patterns',
    related: ['architecture', 'oop', 'solid'],
  },
  'system-design': {
    id: 'system-design',
    name: 'system-design',
    related: ['architecture', 'scalability', 'distributed'],
  },
  typescript: {
    id: 'typescript',
    name: 'typescript',
    related: ['javascript', 'static-typing', 'frontend'],
  },
  nodejs: {
    id: 'nodejs',
    name: 'nodejs',
    related: ['javascript', 'backend', 'server'],
  },
  r: {
    id: 'r',
    name: 'r',
    related: ['data-science', 'statistics', 'visualization'],
  },
  statistics: {
    id: 'statistics',
    name: 'statistics',
    related: ['data-science', 'math', 'analysis'],
  },
  'unit-testing': {
    id: 'unit-testing',
    name: 'unit-testing',
    related: ['testing', 'jest', 'tdd'],
  },
  e2e: { id: 'e2e', name: 'e2e', related: ['testing', 'cypress', 'selenium'] },
  qa: { id: 'qa', name: 'qa', related: ['testing', 'quality', 'automation'] },
  cybersecurity: {
    id: 'cybersecurity',
    name: 'cybersecurity',
    related: ['security', 'hacking', 'defense'],
  },
  pentesting: {
    id: 'pentesting',
    name: 'pentesting',
    related: ['security', 'ethical-hacking', 'vulnerabilities'],
  },
  encryption: {
    id: 'encryption',
    name: 'encryption',
    related: ['security', 'cryptography', 'privacy'],
  },
  github: {
    id: 'github',
    name: 'github',
    related: ['open-source', 'git', 'collaboration'],
  },
  community: {
    id: 'community',
    name: 'community',
    related: ['open-source', 'collaboration', 'networking'],
  },
  contributions: {
    id: 'contributions',
    name: 'contributions',
    related: ['open-source', 'github', 'pull-requests'],
  },
};

export default function TopicSelection() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [displayedTopics, setDisplayedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const minTopicsRequired = 5;

  useEffect(() => {
    const initialTopics = [
      'database',
      'rust',
      'java',
      'elixir',
      'devops',
      'webdev',
      'python',
      'tools',
      'golang',
      'crypto',
      'dotnet',
      'mobile',
      'react',
      'ai',
      'machine-learning',
      'cloud',
      'gaming',
      'tech-news',
      'ruby',
      'architecture',
      'javascript',
      'data-science',
      'testing',
      'security',
      'open-source',
    ];
    setDisplayedTopics(initialTopics);
    setFilteredTopics(initialTopics);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTopics(displayedTopics);
    } else {
      const filtered = Object.values(topicsData)
        .filter(
          (topic) =>
            topic.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            displayedTopics.includes(topic.id),
        )
        .map((topic) => topic.id);
      setFilteredTopics(filtered);
    }
  }, [searchTerm, displayedTopics]);

  const toggleTopic = (topicId: string) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);

      const topic = topicsData[topicId];
      if (topic && topic.related.length > 0) {
        const newDisplayedTopics = [...displayedTopics];
        const topicIndex = newDisplayedTopics.indexOf(topicId);

        const newRelatedTopics = topic.related.filter(
          (relatedId) =>
            !newDisplayedTopics.includes(relatedId) && topicsData[relatedId],
        );

        if (newRelatedTopics.length > 0 && topicIndex !== -1) {
          newDisplayedTopics.splice(topicIndex + 1, 0, ...newRelatedTopics);
          setDisplayedTopics(newDisplayedTopics);
        }
      }
    }
  };

  const hasMinimumTopics = selectedTopics.length >= minTopicsRequired;
  const navigate = useNavigate();

  const handleContinue = () => {
    if (hasMinimumTopics) {
      navigate('/app/home', { replace: true });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Selecione seus interesses
      </h1>

      <div className="relative w-full max-w-lg mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search javascript, php, git, etc.."
          className="pl-10 py-6 bg-[#1a1925] border-[#2e2c3a] text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-wrap gap-3 justify-center mb-12">
        {filteredTopics.map((topicId) => {
          const topic = topicsData[topicId];
          if (!topic) return null; // Prevent rendering if topic is undefined
          const isSelected = selectedTopics.includes(topicId);

          return (
            <Badge
              key={topicId}
              variant="outline"
              className={cn(
                'text-base py-2 px-4 rounded-full cursor-pointer transition-all',
                isSelected
                  ? 'bg-white text-[#0f0e17] hover:bg-gray-200'
                  : 'bg-[#1a1925] text-white hover:bg-[#2e2c3a]',
              )}
              onClick={() => toggleTopic(topicId)}
            >
              {topic.name}
            </Badge>
          );
        })}
      </div>

      <div className="w-full max-w-md">
        <Button
          className={cn(
            'w-full py-6 rounded-full text-lg font-medium transition-all',
            hasMinimumTopics
              ? 'bg-white text-[#0f0e17] hover:bg-gray-200'
              : 'bg-[#2e2c3a] text-gray-400 cursor-not-allowed',
          )}
          disabled={!hasMinimumTopics}
          onClick={handleContinue}
        >
          {selectedTopics.length}/{minTopicsRequired} para mostrar seu feed
          <span className="ml-2">▼</span>
        </Button>
      </div>
    </div>
  );
}
