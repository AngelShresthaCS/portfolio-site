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
