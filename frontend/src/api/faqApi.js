// Mock API for FAQ data focused on programming learning roadmaps and software engineering technologies

const faqData = [
  {
    id: 1,
    category: 'Programming Fundamentals',
    categoryColor: 'text-blue-500',
    categoryIcon: 'Code',
    question: 'What programming language should I learn first as a complete beginner?',
    shortAnswer: 'Python is widely recommended for beginners due to its simple syntax and versatility.',
    detailedAnswer: 'For complete beginners, Python is the most recommended first programming language. It has a clean, readable syntax that closely resembles English, making it easier to understand programming concepts without getting bogged down by complex syntax. Python is also versatile - you can use it for web development, data science, automation, and more.',
    tags: ['beginner', 'python', 'first-language'],
    difficulty: 'beginner',
    estimatedReadTime: '3 min',
    relatedQuestions: [
      'How long does it take to learn Python basics?',
      'What can I build with Python as a beginner?',
      'Should I learn Python 2 or Python 3?'
    ]
  },
  {
    id: 2,
    category: 'Learning Roadmap',
    categoryColor: 'text-green-500',
    categoryIcon: 'Map',
    question: 'What is the complete roadmap to become a full-stack web developer?',
    shortAnswer: 'Start with HTML/CSS/JavaScript, learn a backend language, databases, and frameworks.',
    detailedAnswer: 'The full-stack web development roadmap typically includes: 1) Frontend basics (HTML, CSS, JavaScript), 2) Frontend framework (React, Vue, or Angular), 3) Backend language (Node.js, Python, Java, or C#), 4) Database knowledge (SQL and NoSQL), 5) Version control (Git), 6) Deployment and DevOps basics, 7) Testing and debugging skills.',
    tags: ['roadmap', 'full-stack', 'web-development'],
    difficulty: 'intermediate',
    estimatedReadTime: '8 min',
    relatedQuestions: [
      'How long does it take to become a full-stack developer?',
      'Which frontend framework should I learn first?',
      'What backend technologies are most in demand?'
    ]
  },
  {
    id: 3,
    category: 'Software Engineering Tools',
    categoryColor: 'text-purple-500',
    categoryIcon: 'Settings',
    question: 'What are the essential development tools every programmer should know?',
    shortAnswer: 'Git, IDE/text editor, terminal/command line, package managers, and debugging tools.',
    detailedAnswer: 'Essential development tools include: 1) Version control (Git and GitHub/GitLab), 2) Code editor or IDE (VS Code, IntelliJ, Sublime Text), 3) Terminal/Command Line interface, 4) Package managers (npm, pip, Maven), 5) Debugging tools, 6) Browser developer tools, 7) Database management tools, 8) API testing tools (Postman, Insomnia).',
    tags: ['tools', 'git', 'ide', 'development-environment'],
    difficulty: 'beginner',
    estimatedReadTime: '5 min',
    relatedQuestions: [
      'Which code editor is best for beginners?',
      'How do I set up a development environment?',
      'What is Git and why is it important?'
    ]
  },
  {
    id: 4,
    category: 'Career Path',
    categoryColor: 'text-orange-500',
    categoryIcon: 'TrendingUp',
    question: 'What are the different career paths in software engineering?',
    shortAnswer: 'Frontend, backend, full-stack, mobile, DevOps, data science, and specialized roles.',
    detailedAnswer: 'Software engineering offers diverse career paths: 1) Frontend Developer (user interfaces), 2) Backend Developer (server-side logic), 3) Full-stack Developer (both frontend and backend), 4) Mobile Developer (iOS/Android apps), 5) DevOps Engineer (deployment and infrastructure), 6) Data Scientist/Engineer, 7) Machine Learning Engineer, 8) Security Engineer, 9) QA/Test Engineer, 10) Technical Lead/Architect.',
    tags: ['career', 'specialization', 'job-roles'],
    difficulty: 'beginner',
    estimatedReadTime: '6 min',
    relatedQuestions: [
      'Which programming career pays the most?',
      'How do I choose between frontend and backend?',
      'What skills do I need for each career path?'
    ]
  },
  {
    id: 5,
    category: 'Data Structures & Algorithms',
    categoryColor: 'text-red-500',
    categoryIcon: 'Brain',
    question: 'Why are data structures and algorithms important for programmers?',
    shortAnswer: 'They help write efficient code and are essential for technical interviews.',
    detailedAnswer: 'Data structures and algorithms are fundamental because: 1) They help you write more efficient and optimized code, 2) Essential for technical interviews at major tech companies, 3) Improve problem-solving skills, 4) Help understand how software works under the hood, 5) Enable you to choose the right tool for specific problems, 6) Form the foundation for advanced topics like machine learning and system design.',
    tags: ['algorithms', 'data-structures', 'problem-solving', 'interviews'],
    difficulty: 'intermediate',
    estimatedReadTime: '4 min',
    relatedQuestions: [
      'Which data structures should I learn first?',
      'How do I practice algorithms effectively?',
      'Are algorithms necessary for web development?'
    ]
  },
  {
    id: 6,
    category: 'Modern Tech Stack',
    categoryColor: 'text-cyan-500',
    categoryIcon: 'Layers',
    question: 'What is a modern web development tech stack in 2024?',
    shortAnswer: 'Popular stacks include MERN, MEAN, Django + React, and Next.js with various databases.',
    detailedAnswer: 'Modern web development stacks in 2024 include: 1) MERN (MongoDB, Express, React, Node.js), 2) MEAN (MongoDB, Express, Angular, Node.js), 3) Django + React/Vue, 4) Next.js + TypeScript + Prisma + PostgreSQL, 5) Laravel + Vue.js, 6) Spring Boot + React, 7) ASP.NET Core + Angular. Cloud services like AWS, Azure, and Vercel are also integral parts of modern stacks.',
    tags: ['tech-stack', 'modern-development', 'frameworks', '2024'],
    difficulty: 'intermediate',
    estimatedReadTime: '7 min',
    relatedQuestions: [
      'Which tech stack should I learn for job opportunities?',
      'What is the difference between MERN and MEAN?',
      'How do I choose the right database for my project?'
    ]
  },
  {
    id: 7,
    category: 'Database Management',
    categoryColor: 'text-yellow-500',
    categoryIcon: 'Database',
    question: 'What is the difference between SQL and NoSQL databases?',
    shortAnswer: 'SQL databases are relational with structured data, NoSQL databases are flexible with unstructured data.',
    detailedAnswer: 'SQL databases (like MySQL, PostgreSQL) use structured query language and have predefined schemas with relationships between tables. They ensure ACID compliance and are great for complex queries. NoSQL databases (like MongoDB, Redis) are more flexible, handle unstructured data, scale horizontally better, and are ideal for big data and real-time applications. Choose SQL for complex relationships and transactions, NoSQL for scalability and flexibility.',
    tags: ['database', 'sql', 'nosql', 'data-storage'],
    difficulty: 'intermediate',
    estimatedReadTime: '6 min',
    relatedQuestions: [
      'When should I use MongoDB vs PostgreSQL?',
      'What is database normalization?',
      'How do I design a database schema?'
    ]
  },
  {
    id: 8,
    category: 'Cloud Computing',
    categoryColor: 'text-indigo-500',
    categoryIcon: 'Cloud',
    question: 'What are the basics of cloud computing for developers?',
    shortAnswer: 'Cloud computing provides on-demand computing resources like servers, storage, and databases over the internet.',
    detailedAnswer: 'Cloud computing offers three main service models: 1) IaaS (Infrastructure as a Service) - virtual machines and storage, 2) PaaS (Platform as a Service) - development platforms and tools, 3) SaaS (Software as a Service) - ready-to-use applications. Major providers include AWS, Azure, and Google Cloud. Benefits include scalability, cost-effectiveness, and reduced maintenance. Essential services for developers include compute instances, databases, storage, and deployment platforms.',
    tags: ['cloud', 'aws', 'azure', 'deployment', 'scalability'],
    difficulty: 'intermediate',
    estimatedReadTime: '7 min',
    relatedQuestions: [
      'Which cloud provider should I choose?',
      'How do I deploy my first app to the cloud?',
      'What is serverless computing?'
    ]
  },
  {
    id: 9,
    category: 'Mobile Development',
    categoryColor: 'text-pink-500',
    categoryIcon: 'Smartphone',
    question: 'Should I learn native or cross-platform mobile development?',
    shortAnswer: 'Cross-platform (React Native, Flutter) for faster development, native for performance-critical apps.',
    detailedAnswer: 'Native development (Swift/Objective-C for iOS, Kotlin/Java for Android) offers best performance and platform-specific features but requires separate codebases. Cross-platform frameworks like React Native, Flutter, or Xamarin allow code sharing between platforms, faster development, and lower costs. Choose native for performance-critical apps, games, or platform-specific features. Choose cross-platform for business apps, MVPs, or when you have limited resources.',
    tags: ['mobile', 'react-native', 'flutter', 'ios', 'android'],
    difficulty: 'intermediate',
    estimatedReadTime: '5 min',
    relatedQuestions: [
      'What is React Native vs Flutter?',
      'How long does it take to learn mobile development?',
      'Can I build mobile apps with web technologies?'
    ]
  },
  {
    id: 10,
    category: 'API Development',
    categoryColor: 'text-emerald-500',
    categoryIcon: 'Link',
    question: 'What is REST API and how do I build one?',
    shortAnswer: 'REST API is an architectural style for web services using HTTP methods for CRUD operations.',
    detailedAnswer: 'REST (Representational State Transfer) APIs use HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources. Key principles include: 1) Stateless communication, 2) Uniform interface, 3) Client-server architecture, 4) Cacheable responses. To build a REST API: define resources and endpoints, implement HTTP methods, handle authentication, validate input, format responses (usually JSON), and document your API. Popular frameworks include Express.js, Django REST, Spring Boot, and ASP.NET Core.',
    tags: ['api', 'rest', 'http', 'backend', 'web-services'],
    difficulty: 'intermediate',
    estimatedReadTime: '8 min',
    relatedQuestions: [
      'What is the difference between REST and GraphQL?',
      'How do I secure my API?',
      'What is API documentation and why is it important?'
    ]
  },
  {
    id: 11,
    category: 'Testing & Quality',
    categoryColor: 'text-teal-500',
    categoryIcon: 'CheckCircle',
    question: 'What types of testing should every developer know?',
    shortAnswer: 'Unit testing, integration testing, and end-to-end testing are the three main types every developer should know.',
    detailedAnswer: 'Essential testing types include: 1) Unit Testing - testing individual functions/components in isolation, 2) Integration Testing - testing how different parts work together, 3) End-to-End Testing - testing complete user workflows, 4) Manual Testing - human verification of functionality. Popular testing frameworks include Jest, Mocha, Pytest, JUnit, and Cypress. Good testing practices include writing tests early, aiming for good coverage, and automating tests in CI/CD pipelines.',
    tags: ['testing', 'unit-testing', 'integration', 'quality-assurance'],
    difficulty: 'intermediate',
    estimatedReadTime: '6 min',
    relatedQuestions: [
      'How much test coverage is enough?',
      'What is Test-Driven Development (TDD)?',
      'Which testing framework should I use?'
    ]
  },
  {
    id: 12,
    category: 'Performance Optimization',
    categoryColor: 'text-amber-500',
    categoryIcon: 'Zap',
    question: 'How do I optimize the performance of my web applications?',
    shortAnswer: 'Focus on code optimization, caching, image optimization, and minimizing HTTP requests.',
    detailedAnswer: 'Web performance optimization strategies include: 1) Code optimization - minimize and compress CSS/JS, remove unused code, 2) Image optimization - use appropriate formats (WebP), compress images, lazy loading, 3) Caching - browser caching, CDN usage, server-side caching, 4) Database optimization - efficient queries, indexing, connection pooling, 5) Network optimization - minimize HTTP requests, use HTTP/2, enable compression. Tools like Lighthouse, WebPageTest, and browser DevTools help identify performance bottlenecks.',
    tags: ['performance', 'optimization', 'caching', 'web-vitals'],
    difficulty: 'advanced',
    estimatedReadTime: '9 min',
    relatedQuestions: [
      'What are Core Web Vitals?',
      'How do I measure website performance?',
      'What is lazy loading and when should I use it?'
    ]
  }
];

// Mock API functions
export const getFAQs = async (category = null, difficulty = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredData = faqData;
  
  if (category) {
    filteredData = filteredData.filter(faq => 
      faq.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (difficulty) {
    filteredData = filteredData.filter(faq => faq.difficulty === difficulty);
  }
  
  return {
    success: true,
    data: filteredData,
    total: filteredData.length
  };
};

export const getFAQById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const faq = faqData.find(item => item.id === parseInt(id));
  
  if (!faq) {
    return {
      success: false,
      error: 'FAQ not found'
    };
  }
  
  return {
    success: true,
    data: faq
  };
};

export const searchFAQs = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const searchResults = faqData.filter(faq => 
    faq.question.toLowerCase().includes(query.toLowerCase()) ||
    faq.shortAnswer.toLowerCase().includes(query.toLowerCase()) ||
    faq.detailedAnswer.toLowerCase().includes(query.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
  
  return {
    success: true,
    data: searchResults,
    total: searchResults.length,
    query
  };
};

export const getRelatedFAQs = async (faqId) => {
  await new Promise(resolve => setTimeout(resolve, 250));
  
  const currentFAQ = faqData.find(item => item.id === parseInt(faqId));
  if (!currentFAQ) {
    return { success: false, error: 'FAQ not found' };
  }
  
  // Find related FAQs based on shared tags or category
  const related = faqData.filter(faq => 
    faq.id !== parseInt(faqId) && (
      faq.category === currentFAQ.category ||
      faq.tags.some(tag => currentFAQ.tags.includes(tag))
    )
  ).slice(0, 3);
  
  return {
    success: true,
    data: related
  };
};

export default {
  getFAQs,
  getFAQById,
  searchFAQs,
  getRelatedFAQs
};
