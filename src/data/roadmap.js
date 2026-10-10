// A learning plan inspired by the roadmap reference. These are planned topics,
// not a record of completed courses or a list of current skills.
export const roadmapPhases = [
  {
    id: 'foundations',
    title: 'Strengthen the foundations',
    range: '01–03',
    description: 'Develop the habits behind reliable backend software: clear APIs, thoughtful data models, and useful tests.',
    steps: [
      {
        number: '01',
        title: 'Backend foundations',
        topics: ['FastAPI', 'Authentication', 'PostgreSQL', 'API design'],
        practice: 'Build an authenticated API with migrations and consistent error handling.',
      },
      {
        number: '02',
        title: 'Caching with Redis',
        topics: ['Cache patterns', 'Expiration', 'Rate limiting', 'Pub/sub'],
        practice: 'Add session caching and rate limits, then measure the difference.',
      },
      {
        number: '03',
        title: 'Testing',
        topics: ['pytest', 'Unit tests', 'Integration tests', 'Fixtures'],
        practice: 'Test API behavior, authentication, and the database integration.',
      },
    ],
  },
  {
    id: 'build-deploy',
    title: 'Build and deploy real systems',
    range: '04–08',
    description: 'Connect application development to delivery, cloud infrastructure, and maintainable architecture.',
    steps: [
      {
        number: '04',
        title: 'Docker and containers',
        topics: ['Dockerfiles', 'Compose', 'Networks', 'Multi-stage builds'],
        practice: 'Run the API, PostgreSQL, and Redis together in a local container stack.',
      },
      {
        number: '05',
        title: 'CI/CD with GitHub Actions',
        topics: ['Workflows', 'Automated tests', 'Image builds', 'Deployments'],
        practice: 'Create a pipeline that tests changes and builds a deployable image.',
      },
      {
        number: '06',
        title: 'AWS and cloud deployment',
        topics: ['Compute', 'RDS', 'S3', 'IAM', 'CloudWatch'],
        practice: 'Deploy a service with a managed database, limited permissions, and logs.',
      },
      {
        number: '07',
        title: 'Concurrency and performance',
        topics: ['Async Python', 'Background jobs', 'Connection pools', 'Profiling'],
        practice: 'Profile a slow path and compare throughput before and after a change.',
      },
      {
        number: '08',
        title: 'Design patterns and architecture',
        topics: ['SOLID', 'Dependency injection', 'Separation of concerns'],
        practice: 'Refactor a service into smaller modules with clear responsibilities.',
      },
    ],
  },
  {
    id: 'ai-distributed',
    title: 'Explore AI and distributed systems',
    range: '09–16',
    description: 'Study how data, retrieval, and asynchronous services fit together, with evaluation and observability throughout.',
    steps: [
      {
        number: '09',
        title: 'NoSQL databases',
        topics: ['MongoDB', 'DynamoDB', 'Cassandra', 'Access patterns'],
        practice: 'Compare data models for documents, user settings, and event logs.',
      },
      {
        number: '10',
        title: 'Event streaming with Kafka',
        topics: ['Topics', 'Partitions', 'Producers', 'Consumer groups'],
        practice: 'Build a small event pipeline and handle retries and replay.',
      },
      {
        number: '11',
        title: 'Graph databases',
        topics: ['Neo4j', 'Relationships', 'Cypher', 'Graph queries'],
        practice: 'Model relationships between users, projects, and tasks.',
      },
      {
        number: '12',
        title: 'LLM and AI fundamentals',
        topics: ['Tokens', 'Context windows', 'Prompting', 'Embeddings'],
        practice: 'Build a small text assistant and evaluate its responses on a fixed set of examples.',
      },
      {
        number: '13',
        title: 'Vector databases',
        topics: ['Similarity search', 'pgvector', 'Indexing', 'Hybrid search'],
        practice: 'Index documents and compare keyword and semantic search results.',
      },
      {
        number: '14',
        title: 'Retrieval-augmented generation',
        topics: ['Chunking', 'Retrieval', 'Context injection', 'Evaluation'],
        practice: 'Answer questions from documents with source citations and retrieval checks.',
      },
      {
        number: '15',
        title: 'AI agents and tools',
        topics: ['Tool calling', 'Memory', 'Planning', 'Permission boundaries'],
        practice: 'Prototype an assistant that uses a small set of tools with explicit permissions.',
      },
      {
        number: '16',
        title: 'Observability and monitoring',
        topics: ['Prometheus', 'Grafana', 'Logs', 'OpenTelemetry'],
        practice: 'Trace a request across services and create a dashboard for failures and latency.',
      },
    ],
  },
];

// Branches reorganize the existing learning plan for the interactive tree.
// Node details reference the original step object, so topics and exercises
// continue to have one source of truth and do not imply completed learning.
const roadmapStepLookup = new Map(
  roadmapPhases.flatMap(phase => phase.steps.map(step => [
    step.number,
    { step, phaseTitle: phase.title },
  ])),
);

function makeTopic(number, title, icon, focusIndices, description) {
  const { step, phaseTitle } = roadmapStepLookup.get(number);
  return {
    id: `topic-${number}`,
    title,
    focus: focusIndices.map(index => step.topics[index]).join(' · '),
    icon,
    description,
    step,
    phaseTitle,
  };
}

export const roadmapBranches = [
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs, caching, tests, and architecture.',
    icon: 'FiServer',
    accent: '#a8ccec',
    tint: '#152535',
    connector: '#456078',
    nodes: [
      makeTopic('01', 'Backend APIs', 'FiServer', [0, 2], 'Authentication, API design, and migrations shape a reliable service.'),
      makeTopic('02', 'Redis caching', 'FiZap', [0, 2], 'Cache expiration and rate limits keep sessions responsive and controlled.'),
      makeTopic('03', 'Testing', 'FiCheckCircle', [0, 2], 'Unit tests, integration tests, and fixtures check service behavior.'),
      makeTopic('08', 'Design patterns', 'FiLayers', [0, 1], 'SOLID, dependency injection, and separation of concerns keep responsibilities clear.'),
    ],
  },
  {
    id: 'database-data',
    title: 'Database & data',
    description: 'Models, relationships, and semantic search.',
    icon: 'FiDatabase',
    accent: '#c1ade6',
    tint: '#231e34',
    connector: '#65577b',
    nodes: [
      makeTopic('09', 'NoSQL databases', 'FiDatabase', [0, 1], 'Access patterns guide models for documents, user settings, and event logs.'),
      makeTopic('11', 'Graph databases', 'FiShare2', [0, 2], 'Relationships and Cypher make connected application data queryable.'),
      makeTopic('13', 'Vector search', 'FiSearch', [1, 3], 'Similarity search, indexing, and hybrid search connect queries with relevant documents.'),
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Containers, delivery, and cloud deployment.',
    icon: 'FiCloud',
    accent: '#e5c092',
    tint: '#2c241b',
    connector: '#77644d',
    nodes: [
      makeTopic('04', 'Containers', 'FiBox', [0, 1], 'Dockerfiles, Compose, and networks define how local services run together.'),
      makeTopic('05', 'GitHub Actions', 'FiGitBranch', [0, 1], 'Workflows connect automated tests, image builds, and deployments.'),
      makeTopic('06', 'AWS deployment', 'FiCloud', [1, 3], 'Compute, storage, IAM, and CloudWatch connect deployment with access and visibility.'),
    ],
  },
  {
    id: 'ai-distributed-systems',
    title: 'AI & distributed systems',
    description: 'Events, retrieval, and tool-using assistants.',
    icon: 'FiCpu',
    accent: '#dda9ca',
    tint: '#2b1e2b',
    connector: '#775870',
    nodes: [
      makeTopic('10', 'Kafka streaming', 'FiGitMerge', [0, 3], 'Topics, partitions, producers, and consumer groups organize event flow.'),
      makeTopic('12', 'LLM fundamentals', 'FiMessageSquare', [0, 3], 'Tokens, context windows, prompting, and embeddings shape model inputs and responses.'),
      makeTopic('14', 'RAG', 'FiSearch', [0, 1], 'Chunking, retrieval, and context injection connect answers to source documents.'),
      makeTopic('15', 'AI agents & tools', 'FiTool', [0, 3], 'Memory and planning organize tool use within explicit permission boundaries.'),
    ],
  },
  {
    id: 'reliability',
    title: 'Reliability',
    description: 'Performance, traces, and service health.',
    icon: 'FiActivity',
    accent: '#a6ccb8',
    tint: '#192923',
    connector: '#4f6b5e',
    nodes: [
      makeTopic('07', 'Concurrency', 'FiSliders', [0, 3], 'Async Python and connection pools help explain limits on service throughput.'),
      makeTopic('16', 'Observability', 'FiActivity', [0, 3], 'Metrics, logs, and traces help explain service failures and latency.'),
    ],
  },
];
