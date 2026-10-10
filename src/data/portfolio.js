export const profile = {
  name: 'Angel Singh Shrestha',
  email: 'angelshresthacs@gmail.com',
  location: 'Arlington, Texas',
  university: 'University of Texas at Arlington',
  universityLogo: 'https://upload.wikimedia.org/wikipedia/commons/d/da/UTA_logomark.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original',
  heroImage: 'avatar-square.png',
  degree: 'B.S. Computer Science',
  graduation: 'May 2028',
  gpa: '3.89',
  github: 'https://github.com/angelshresthacs',
  leetcodeUsername: 'angelshresthacs',
  linkedin: 'https://linkedin.com/in/angelshrestha'
};
export const projects = [{
  title: 'PhilosoStream',
  category: 'Full-stack / AI',
  image: 'philosostream.png',
  summary: 'A note intelligence platform that turns personal knowledge into grounded answers, summaries, and recommendations.',
  introduction: 'Grounded answers, summaries, and recommendations from personal notes.',
  highlight: 'Secure APIs with OAuth 2.0 and Redis caching; 42 ms average API latency.',
  featuredTechnologies: ['Next.js', 'FastAPI', 'MongoDB', 'AWS'],
  points: ['Secure REST APIs, OAuth 2.0, MongoDB, Amazon S3, and Redis caching, with 42 ms average API latency.', 'RAG and recommendation pipelines using vector embeddings, semantic retrieval, Kafka, Airflow, and MLflow.', 'Asynchronous SNS/SQS/Lambda workflows and a Terraform-managed ECS architecture designed for 5,000+ concurrent sessions.'],
  technologies: ['TypeScript', 'Next.js', 'FastAPI', 'MongoDB', 'AWS', 'Terraform', 'Docker', 'GitHub Actions'],
  github: 'https://github.com/AngelShresthaCS/philosostream',
  demo: ''
}, {
  title: 'Cloud & Infrastructure Homelab',
  category: 'Cloud / Infrastructure',
  image: 'homelab.jpg',
  summary: 'A hands-on environment for running services, connecting hybrid infrastructure, and understanding how systems behave.',
  introduction: 'A home environment for running services and exploring hybrid infrastructure.',
  highlight: 'Operated 10+ virtualized and containerized services across Proxmox, AWS, and Azure.',
  featuredTechnologies: ['Linux', 'Proxmox', 'Docker', 'Grafana'],
  points: ['Operated 10+ virtualized and containerized services across Proxmox, AWS, and Azure.', 'Implemented network segmentation, reverse proxying, and secure remote access.', 'Centralized metrics and logs with Prometheus, Grafana, Zabbix, and Splunk.'],
  technologies: ['Linux', 'Docker', 'Proxmox', 'AWS', 'Azure', 'Nginx', 'Prometheus', 'Grafana'],
  github: '',
  demo: ''
}];
export const experiences = [{
  title: 'Student Technical Assistant | Network Operations',
  company: 'Office of Information Technology, University of Texas at Arlington',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt9hqztJ9DS6D4YwpPTzsiu5e8N6kgdADB-gLJ3BL1DfzwxTDo-8auITc&s=10',
  logoAlt: 'UTA Office of Information Technology logo',
  period: 'Feb. 2026 – Present',
  location: 'Arlington, TX',
  summary: 'Support hybrid Azure and on-premises infrastructure through observability, incident response, and automation.',
  highlights: ['Maintained a 90%+ same-day resolution rate for cross-functional escalations.', 'Engineered JavaScript automation to reduce repetitive manual work for Tier 1 support teams.'],
  tools: ['Azure', 'Linux', 'Zabbix', 'Grafana', 'Splunk', 'PagerDuty', 'JavaScript'],
  points: [
    'Managed observability and incident-response workflows across hybrid Azure/on-prem infrastructure using Zabbix, Grafana, Splunk, and PagerDuty; maintained a 90%+ same-day resolution rate for cross-functional escalations.',
    'Diagnosed Linux, application, and network infrastructure incidents through centralized log analysis and system telemetry; evaluated production changes through Change Advisory Board (CAB) processes.',
    'Engineered browser-based JavaScript automation for internal operational workflows, reducing repetitive manual processes for Tier 1 support teams.'
  ]
}, {
  // Completed role and dates retained from the original portfolio's experience data.
  title: 'Service Desk Analyst (Tier I)',
  company: 'Office of Information Technology, University of Texas at Arlington',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt9hqztJ9DS6D4YwpPTzsiu5e8N6kgdADB-gLJ3BL1DfzwxTDo-8auITc&s=10',
  logoAlt: 'UTA Office of Information Technology logo',
  period: 'June 2025 – December 2025',
  summary: 'Automated support workflows and managed campus access, provisioning, and service operations.',
  highlights: ['Automated MFA resets with JavaScript to eliminate redundant steps and reduce Tier 1 ticket resolution time.', 'Managed account lifecycles and led daily service operations, including approvals and audits of escalated access requests.'],
  tools: ['JavaScript', 'Active Directory', 'Microsoft Entra ID', 'Microsoft 365 Admin Center', 'MFA'],
  points: [
    'Process Automation: Developed a JavaScript automation script to streamline Multi-Factor Authentication (MFA) resets, eliminating redundant manual steps and significantly reducing ticket resolution time for Tier 1 IT Analysts.',
    'Identity & Access Management (IAM): Managed the full account lifecycle using Active Directory, Microsoft Entra ID, and the Microsoft 365 Admin Center, handling high-privilege provisioning and enforcing strict data confidentiality protocols.',
    'Team Leadership & Approvals: Directed daily service operations as a Team Lead, evaluating, approving, and auditing escalated access requests and application permissions for the university.',
    'Enterprise Software Provisioning: Administered and granted secure access to complex, organizational-level software suites and engineering applications, including MATLAB, SolidWorks, and Ansys.',
    'Systems Troubleshooting: Diagnosed and resolved hardware, wireless, and software infrastructure issues across multiple platforms, including Canvas LMS, internal databases, and enterprise printing systems (Pharos).',
    'Technical Documentation: Authored and maintained comprehensive knowledge base articles and Standard Operating Procedures (SOPs) to standardize IT business analysis and streamline the troubleshooting process.'
  ]
}, {
  title: 'Undergraduate Research Assistant',
  company: 'University of Texas at Arlington',
  logo: 'https://cdn.freebiesupply.com/logos/large/2x/research-logo-black-and-white.png',
  logoAlt: 'Research logo',
  period: 'May 2025 – July 2025',
  summary: 'Built Python simulations for 2D in-memory computing research.',
  highlights: ['Calculated node-level mesh impedance to support Electronic Design Analysis workflows.'],
  tools: ['Python', 'Jupyter'],
  points: ['Developed a Python simulation framework in Jupyter to calculate node-level mesh impedance for 2D in-memory computing architectures, delivering computational models for Electronic Design Analysis workflow analysis.']
}];
export const certifications = [{
  name: 'AWS Certified AI Practitioner',
  credentialId: '',
  issuer: 'Amazon Web Services',
  date: 'August 7, 2026',
  status: 'Earned',
  image: 'aws-ai.png',
  fallbackImage: 'aws-ai.svg',
  verification: 'https://www.credly.com/badges/64509ca1-40e6-4588-bdde-2c4cb054da61'
}, {
  name: 'AWS Certified Cloud Practitioner',
  credentialId: '',
  issuer: 'Amazon Web Services',
  date: 'August 14, 2026',
  status: 'Earned',
  image: 'aws-cloud.png',
  fallbackImage: 'aws-cloud.svg',
  verification: 'https://www.credly.com/badges/2aa9f26a-f9d8-494f-9843-f74c6c15f6cf'
}, {
  name: 'Microsoft Certified: GitHub Actions',
  credentialId: '',
  issuer: 'Microsoft / GitHub',
  date: 'August 28, 2026',
  status: 'Earned',
  image: 'github-actions.png',
  fallbackImage: 'github-actions.svg',
  verification: 'https://learn.microsoft.com/en-us/users/angelshrestha/credentials/ca647521ee00c033'
}, {
  name: 'AWS Certified Solutions Architect',
  credentialId: '',
  issuer: 'Amazon Web Services',
  date: 'October 23, 2026',
  status: 'In progress',
  image: 'aws-architect.png',
  fallbackImage: 'aws-architect.svg',
  verification: ''
}];
export const skillCategories = [{
  title: 'Languages',
  featuredSkills: ['Python', 'TypeScript', 'JavaScript', 'C/C++', 'Go', 'SQL'],
  skills: ['Python', 'C/C++', 'C#', 'Go', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'Bash']
}, {
  title: 'Backend & frameworks',
  featuredSkills: ['FastAPI', '.NET / ASP.NET Core', 'Node.js', 'REST APIs', 'Next.js', 'Redis'],
  skills: ['FastAPI', '.NET / ASP.NET Core', 'Node.js', 'Next.js', 'REST APIs', 'gRPC', 'Apache Kafka', 'Redis', 'Microservices']
}, {
  title: 'AI & machine learning',
  featuredSkills: ['PyTorch', 'RAG', 'LLMs', 'Vector search', 'Embeddings', 'OpenAI / Anthropic APIs'],
  skills: ['PyTorch', 'RAG', 'LLMs', 'Embeddings', 'Vector search', 'Amazon Bedrock', 'OpenAI / Anthropic APIs', 'MCP', 'Claude Code']
}, {
  title: 'Cloud & DevOps',
  featuredSkills: ['AWS: ECS, Lambda, S3, SQS, SNS, EC2', 'Azure', 'Docker', 'Terraform', 'Linux', 'GitHub Actions'],
  skills: ['AWS: ECS, Lambda, S3, SQS, SNS, EC2', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'GitHub Actions']
}, {
  title: 'Databases & observability',
  featuredSkills: ['PostgreSQL', 'MongoDB', 'Prometheus', 'Grafana', 'MySQL', 'DynamoDB'],
  skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Prometheus', 'Grafana', 'Splunk', 'PagerDuty']
}, {
  title: 'Testing & tools',
  featuredSkills: ['Git', 'pytest', 'Jest', 'Playwright', 'Unit testing', 'Integration testing'],
  skills: ['Git', 'CMake', 'pytest', 'GoogleTest', 'Jest', 'Playwright', 'k6', 'Unit testing', 'Integration testing']
}];
export const coursework = ['Data Structures & Algorithms', 'Databases', 'Intro to Software Engineering', 'Programming Languages', 'Operating Systems', 'Object-Oriented Programming'];
