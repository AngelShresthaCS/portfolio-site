import { FaJava } from 'react-icons/fa';
import {
  LuBoxes,
  LuBrainCircuit,
  LuCircleCheck,
  LuCloudCog,
  LuCodeXml,
  LuDatabase,
  LuDrama,
  LuLayers,
  LuNetwork,
  LuPlug2,
  LuSearch,
  LuTestTubeDiagonal,
  LuWaypoints,
  LuWorkflow
} from 'react-icons/lu';
import {
  SiAmazoncloudwatch,
  SiAmazondynamodb,
  SiAmazoniam,
  SiAmazonrds,
  SiAmazons3,
  SiAmazonwebservices,
  SiApachecassandra,
  SiApachekafka,
  SiClaude,
  SiCmake,
  SiCplusplus,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiGrafana,
  SiJavascript,
  SiJest,
  SiK6,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiOpentelemetry,
  SiPagerduty,
  SiPostgresql,
  SiPrometheus,
  SiProxmox,
  SiPytest,
  SiPython,
  SiPytorch,
  SiRedis,
  SiSplunk,
  SiTerraform,
  SiTypescript
} from 'react-icons/si';
import { TbBrandAzure, TbBrandCSharp } from 'react-icons/tb';

export const technologyIcons = {
  Python: SiPython,
  'C/C++': SiCplusplus,
  'C#': TbBrandCSharp,
  Go: SiGo,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  SQL: LuDatabase,
  Bash: SiGnubash,
  FastAPI: SiFastapi,
  '.NET / ASP.NET Core': SiDotnet,
  'Node.js': SiNodedotjs,
  'Next.js': SiNextdotjs,
  'REST APIs': LuNetwork,
  gRPC: LuWorkflow,
  'Apache Kafka': SiApachekafka,
  Redis: SiRedis,
  Microservices: LuBoxes,
  PyTorch: SiPytorch,
  RAG: LuLayers,
  LLMs: LuBrainCircuit,
  Embeddings: LuWaypoints,
  'Vector search': LuSearch,
  'Amazon Bedrock': LuCloudCog,
  'OpenAI / Anthropic APIs': SiOpenai,
  MCP: LuPlug2,
  'Claude Code': SiClaude,
  'AWS: ECS, Lambda, S3, SQS, SNS, EC2': SiAmazonwebservices,
  AWS: SiAmazonwebservices,
  Azure: TbBrandAzure,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  Linux: SiLinux,
  Proxmox: SiProxmox,
  Nginx: SiNginx,
  'GitHub Actions': SiGithubactions,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  DynamoDB: SiAmazondynamodb,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Splunk: SiSplunk,
  PagerDuty: SiPagerduty,
  Git: SiGit,
  CMake: SiCmake,
  pytest: SiPytest,
  GoogleTest: LuTestTubeDiagonal,
  Jest: SiJest,
  Playwright: LuDrama,
  k6: SiK6,
  'Unit testing': LuCircleCheck,
  'Integration testing': LuWorkflow,
  Cassandra: SiApachecassandra,
  RDS: SiAmazonrds,
  S3: SiAmazons3,
  IAM: SiAmazoniam,
  CloudWatch: SiAmazoncloudwatch,
  OpenTelemetry: SiOpentelemetry,
  Neo4j: LuWaypoints,
  Cypher: LuWaypoints,
  'Graph queries': LuWaypoints,
  pgvector: SiPostgresql
};

const normalizedTechnologyIcons = new Map(
  Object.entries(technologyIcons).map(([name, Icon]) => [name.toLowerCase(), Icon])
);

const technologyAliases = new Map([
  ['async python', 'python'],
  ['dockerfiles', 'docker'],
  ['compose', 'docker'],
  ['multi-stage builds', 'docker'],
  ['image builds', 'docker'],
  ['unit tests', 'unit testing'],
  ['integration tests', 'integration testing'],
  ['api design', 'rest apis'],
  ['networks', 'rest apis'],
  ['kafka', 'apache kafka']
]);

export function resolveSkillIcon(name) {
  const normalizedName = typeof name === 'string' ? name.trim().toLowerCase() : '';
  const key = technologyAliases.get(normalizedName) || normalizedName;
  return normalizedTechnologyIcons.get(key) || LuCodeXml;
}

export default function SkillIcon({ name, className = 'skill-icon' }) {
  const Icon = resolveSkillIcon(name);
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
