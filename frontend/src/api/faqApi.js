// Mock API for FAQ data focused on programming learning roadmaps and software engineering technologies

const faqData = [
  {
    id: 1,
    category: 'Kiến thức cơ bản về lập trình',
    categoryColor: 'text-blue-500',
    categoryIcon: 'Code',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop&auto=format',
    question: 'Người mới bắt đầu nên học ngôn ngữ lập trình nào đầu tiên?',
    shortAnswer: 'Python được khuyến nghị rộng rãi cho người mới bắt đầu vì cú pháp đơn giản và tính linh hoạt.',
    detailedAnswer: 'Đối với người mới bắt đầu, Python là ngôn ngữ lập trình đầu tiên được khuyến nghị nhất. Nó có cú pháp rõ ràng, dễ đọc, gần giống với tiếng Anh, giúp dễ dàng hiểu các khái niệm lập trình mà không bị sa lầy bởi cú pháp phức tạp. Python cũng rất linh hoạt - bạn có thể sử dụng nó để phát triển web, khoa học dữ liệu, tự động hóa, v.v.',
    tags: ['người mới bắt đầu', 'python', 'ngôn ngữ đầu tiên'],
    relatedQuestions: [
      'Mất bao lâu để học cơ bản về Python?',
      'Tôi có thể xây dựng gì với Python khi mới bắt đầu?',
      'Tôi nên học Python 2 hay Python 3?'
    ]
  },
  {
    id: 2,
    category: 'Lộ trình học tập',
    categoryColor: 'text-green-500',
    categoryIcon: 'Map',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format',
    question: 'Lộ trình đầy đủ để trở thành một nhà phát triển web full-stack là gì?',
    shortAnswer: 'Bắt đầu với HTML/CSS/JavaScript, học một ngôn ngữ backend, cơ sở dữ liệu và các framework.',
    detailedAnswer: 'Lộ trình phát triển web full-stack thường bao gồm: 1) Kiến thức cơ bản về Frontend (HTML, CSS, JavaScript), 2) Framework Frontend (React, Vue, hoặc Angular), 3) Ngôn ngữ Backend (Node.js, Python, Java, hoặc C#), 4) Kiến thức về cơ sở dữ liệu (SQL và NoSQL), 5) Kiểm soát phiên bản (Git), 6) Kiến thức cơ bản về triển khai và DevOps, 7) Kỹ năng kiểm thử và gỡ lỗi.',
    tags: ['lộ trình', 'full-stack', 'phát triển web'],
    relatedQuestions: [
      'Mất bao lâu để trở thành một nhà phát triển full-stack?',
      'Tôi nên học framework frontend nào đầu tiên?',
      'Những công nghệ backend nào đang có nhu cầu cao nhất?'
    ]
  },
  {
    id: 3,
    category: 'Công cụ kỹ thuật phần mềm',
    categoryColor: 'text-purple-500',
    categoryIcon: 'Settings',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&auto=format',
    question: 'Những công cụ phát triển thiết yếu mà mọi lập trình viên nên biết là gì?',
    shortAnswer: 'Git, IDE/trình soạn thảo văn bản, terminal/dòng lệnh, trình quản lý gói và công cụ gỡ lỗi.',
    detailedAnswer: 'Các công cụ phát triển thiết yếu bao gồm: 1) Kiểm soát phiên bản (Git và GitHub/GitLab), 2) Trình soạn thảo mã hoặc IDE (VS Code, IntelliJ, Sublime Text), 3) Giao diện Terminal/Dòng lệnh, 4) Trình quản lý gói (npm, pip, Maven), 5) Công cụ gỡ lỗi, 6) Công cụ phát triển trình duyệt, 7) Công cụ quản lý cơ sở dữ liệu, 8) Công cụ kiểm thử API (Postman, Insomnia).',
    tags: ['công cụ', 'git', 'ide', 'môi trường phát triển'],
    relatedQuestions: [
      'Trình soạn thảo mã nào tốt nhất cho người mới bắt đầu?',
      'Làm thế nào để thiết lập môi trường phát triển?',
      'Git là gì và tại sao nó quan trọng?'
    ]
  },
  {
    id: 4,
    category: 'Con đường sự nghiệp',
    categoryColor: 'text-orange-500',
    categoryIcon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format',
    question: 'Các con đường sự nghiệp khác nhau trong ngành kỹ thuật phần mềm là gì?',
    shortAnswer: 'Frontend, backend, full-stack, di động, DevOps, khoa học dữ liệu và các vai trò chuyên biệt.',
    detailedAnswer: 'Kỹ thuật phần mềm cung cấp các con đường sự nghiệp đa dạng: 1) Lập trình viên Frontend (giao diện người dùng), 2) Lập trình viên Backend (logic phía máy chủ), 3) Lập trình viên Full-stack (cả frontend và backend), 4) Lập trình viên di động (ứng dụng iOS/Android), 5) Kỹ sư DevOps (triển khai và cơ sở hạ tầng), 6) Nhà khoa học/Kỹ sư dữ liệu, 7) Kỹ sư học máy, 8) Kỹ sư bảo mật, 9) Kỹ sư QA/Kiểm thử, 10) Trưởng nhóm kỹ thuật/Kiến trúc sư.',
    tags: ['sự nghiệp', 'chuyên môn hóa', 'vai trò công việc'],
    relatedQuestions: [
      'Nghề lập trình nào có mức lương cao nhất?',
      'Làm thế nào để lựa chọn giữa frontend và backend?',
      'Tôi cần những kỹ năng gì cho mỗi con đường sự nghiệp?'
    ]
  },
  {
    id: 5,
    category: 'Cấu trúc dữ liệu & Thuật toán',
    categoryColor: 'text-red-500',
    categoryIcon: 'Brain',
    image: 'https://www.appacademy.io/wp-content/uploads/2024/03/65788300e4727694b6898722_top-algorithms-and-data-structures-you-really-need-to-know-blog-hero-image.webp',
    question: 'Tại sao cấu trúc dữ liệu và thuật toán quan trọng đối với lập trình viên?',
    shortAnswer: 'Chúng giúp viết mã hiệu quả và rất cần thiết cho các cuộc phỏng vấn kỹ thuật.',
    detailedAnswer: 'Cấu trúc dữ liệu và thuật toán rất quan trọng vì: 1) Chúng giúp bạn viết mã hiệu quả và tối ưu hơn, 2) Cần thiết cho các cuộc phỏng vấn kỹ thuật tại các công ty công nghệ lớn, 3) Cải thiện kỹ năng giải quyết vấn đề, 4) Giúp hiểu cách phần mềm hoạt động bên trong, 5) Cho phép bạn chọn công cụ phù hợp cho các vấn đề cụ thể, 6) Tạo nền tảng cho các chủ đề nâng cao như học máy và thiết kế hệ thống.',
    tags: ['thuật toán', 'cấu trúc dữ liệu', 'giải quyết vấn đề', 'phỏng vấn'],
    relatedQuestions: [
      'Tôi nên học cấu trúc dữ liệu nào đầu tiên?',
      'Làm thế nào để luyện tập thuật toán hiệu quả?',
      'Thuật toán có cần thiết cho phát triển web không?'
    ]
  },
  {
    id: 6,
    category: 'Ngăn xếp công nghệ hiện đại',
    categoryColor: 'text-cyan-500',
    categoryIcon: 'Layers',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&auto=format',
    question: 'Ngăn xếp công nghệ phát triển web hiện đại năm 2024 là gì?',
    shortAnswer: 'Các ngăn xếp phổ biến bao gồm MERN, MEAN, Django + React, và Next.js với các cơ sở dữ liệu khác nhau.',
    detailedAnswer: 'Các ngăn xếp phát triển web hiện đại năm 2024 bao gồm: 1) MERN (MongoDB, Express, React, Node.js), 2) MEAN (MongoDB, Express, Angular, Node.js), 3) Django + React/Vue, 4) Next.js + TypeScript + Prisma + PostgreSQL, 5) Laravel + Vue.js, 6) Spring Boot + React, 7) ASP.NET Core + Angular. Các dịch vụ đám mây như AWS, Azure và Vercel cũng là những phần không thể thiếu của các ngăn xếp hiện đại.',
    tags: ['ngăn xếp công nghệ', 'phát triển hiện đại', 'framework', '2024'],
    relatedQuestions: [
      'Tôi nên học ngăn xếp công nghệ nào để có cơ hội việc làm?',
      'Sự khác biệt giữa MERN và MEAN là gì?',
      'Làm thế nào để chọn cơ sở dữ liệu phù hợp cho dự án của tôi?'
    ]
  },
  {
    id: 7,
    category: 'Quản lý cơ sở dữ liệu',
    categoryColor: 'text-yellow-500',
    categoryIcon: 'Database',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop&auto=format',
    question: 'Sự khác biệt giữa cơ sở dữ liệu SQL và NoSQL là gì?',
    shortAnswer: 'Cơ sở dữ liệu SQL là quan hệ với dữ liệu có cấu trúc, cơ sở dữ liệu NoSQL linh hoạt với dữ liệu phi cấu trúc.',
    detailedAnswer: 'Cơ sở dữ liệu SQL (như MySQL, PostgreSQL) sử dụng ngôn ngữ truy vấn có cấu trúc và có lược đồ được xác định trước với các mối quan hệ giữa các bảng. Chúng đảm bảo tuân thủ ACID và rất phù hợp cho các truy vấn phức tạp. Cơ sở dữ liệu NoSQL (như MongoDB, Redis) linh hoạt hơn, xử lý dữ liệu phi cấu trúc, mở rộng theo chiều ngang tốt hơn và lý tưởng cho dữ liệu lớn và các ứng dụng thời gian thực. Chọn SQL cho các mối quan hệ và giao dịch phức tạp, NoSQL cho khả năng mở rộng và tính linh hoạt.',
    tags: ['cơ sở dữ liệu', 'sql', 'nosql', 'lưu trữ dữ liệu'],
    relatedQuestions: [
      'Khi nào tôi nên sử dụng MongoDB và PostgreSQL?',
      'Chuẩn hóa cơ sở dữ liệu là gì?',
      'Làm thế nào để thiết kế một lược đồ cơ sở dữ liệu?'
    ]
  },
  {
    id: 8,
    category: 'Điện toán đám mây',
    categoryColor: 'text-indigo-500',
    categoryIcon: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&auto=format',
    question: 'Những kiến thức cơ bản về điện toán đám mây dành cho lập trình viên là gì?',
    shortAnswer: 'Điện toán đám mây cung cấp các tài nguyên máy tính theo yêu cầu như máy chủ, lưu trữ và cơ sở dữ liệu qua internet.',
    detailedAnswer: 'Điện toán đám mây cung cấp ba mô hình dịch vụ chính: 1) IaaS (Cơ sở hạ tầng như một dịch vụ) - máy ảo và lưu trữ, 2) PaaS (Nền tảng như một dịch vụ) - nền tảng và công cụ phát triển, 3) SaaS (Phần mềm như một dịch vụ) - ứng dụng sẵn sàng sử dụng. Các nhà cung cấp lớn bao gồm AWS, Azure và Google Cloud. Lợi ích bao gồm khả năng mở rộng, hiệu quả về chi phí và giảm bảo trì. Các dịch vụ thiết yếu cho lập trình viên bao gồm các phiên bản máy tính, cơ sở dữ liệu, lưu trữ và nền tảng triển khai.',
    tags: ['đám mây', 'aws', 'azure', 'triển khai', 'khả năng mở rộng'],
    relatedQuestions: [
      'Tôi nên chọn nhà cung cấp đám mây nào?',
      'Làm thế nào để triển khai ứng dụng đầu tiên lên đám mây?',
      'Điện toán không máy chủ là gì?'
    ]
  },
  {
    id: 9,
    category: 'Phát triển di động',
    categoryColor: 'text-pink-500',
    categoryIcon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&auto=format',
    question: 'Tôi nên học phát triển di động native hay đa nền tảng?',
    shortAnswer: 'Đa nền tảng (React Native, Flutter) để phát triển nhanh hơn, native cho các ứng dụng đòi hỏi hiệu suất cao.',
    detailedAnswer: 'Phát triển native (Swift/Objective-C cho iOS, Kotlin/Java cho Android) cung cấp hiệu suất tốt nhất và các tính năng đặc thù của nền tảng nhưng yêu cầu các codebase riêng biệt. Các framework đa nền tảng như React Native, Flutter hoặc Xamarin cho phép chia sẻ mã giữa các nền tảng, phát triển nhanh hơn và chi phí thấp hơn. Chọn native cho các ứng dụng đòi hỏi hiệu suất cao, game hoặc các tính năng đặc thù của nền tảng. Chọn đa nền tảng cho các ứng dụng kinh doanh, MVP hoặc khi bạn có tài nguyên hạn chế.',
    tags: ['di động', 'react-native', 'flutter', 'ios', 'android'],
    relatedQuestions: [
      'React Native và Flutter khác nhau như thế nào?',
      'Mất bao lâu để học phát triển di động?',
      'Tôi có thể xây dựng ứng dụng di động bằng công nghệ web không?'
    ]
  },
  {
    id: 10,
    category: 'Phát triển API',
    categoryColor: 'text-emerald-500',
    categoryIcon: 'Link',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&auto=format',
    question: 'REST API là gì và làm thế nào để xây dựng một API?',
    shortAnswer: 'REST API là một kiểu kiến trúc cho các dịch vụ web sử dụng các phương thức HTTP cho các thao tác CRUD.',
    detailedAnswer: 'REST (Representational State Transfer) API sử dụng các phương thức HTTP (GET, POST, PUT, DELETE) để thực hiện các thao tác trên tài nguyên. Các nguyên tắc chính bao gồm: 1) Giao tiếp không trạng thái, 2) Giao diện thống nhất, 3) Kiến trúc client-server, 4) Phản hồi có thể cache. Để xây dựng REST API: định nghĩa tài nguyên và endpoint, triển khai các phương thức HTTP, xử lý xác thực, xác thực đầu vào, định dạng phản hồi (thường là JSON) và tài liệu hóa API của bạn. Các framework phổ biến bao gồm Express.js, Django REST, Spring Boot và ASP.NET Core.',
    tags: ['api', 'rest', 'http', 'backend', 'dịch vụ web'],
    relatedQuestions: [
      'Sự khác biệt giữa REST và GraphQL là gì?',
      'Làm thế nào để bảo mật API của tôi?',
      'Tài liệu API là gì và tại sao nó quan trọng?'
    ]
  },
  {
    id: 11,
    category: 'Kiểm thử & Chất lượng',
    categoryColor: 'text-teal-500',
    categoryIcon: 'CheckCircle',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format',
    question: 'Những loại kiểm thử nào mà mọi lập trình viên nên biết?',
    shortAnswer: 'Kiểm thử đơn vị, kiểm thử tích hợp và kiểm thử end-to-end là ba loại chính mà mọi lập trình viên nên biết.',
    detailedAnswer: 'Các loại kiểm thử thiết yếu bao gồm: 1) Kiểm thử đơn vị - kiểm tra các hàm/thành phần riêng lẻ một cách cô lập, 2) Kiểm thử tích hợp - kiểm tra cách các phần khác nhau hoạt động cùng nhau, 3) Kiểm thử End-to-End - kiểm tra các luồng người dùng hoàn chỉnh, 4) Kiểm thử thủ công - xác minh chức năng của con người. Các framework kiểm thử phổ biến bao gồm Jest, Mocha, Pytest, JUnit và Cypress. Các phương pháp kiểm thử tốt bao gồm viết kiểm thử sớm, hướng tới độ bao phủ tốt và tự động hóa các kiểm thử trong các đường ống CI/CD.',
    tags: ['kiểm thử', 'kiểm thử đơn vị', 'tích hợp', 'đảm bảo chất lượng'],
    relatedQuestions: [
      'Mức độ bao phủ kiểm thử bao nhiêu là đủ?',
      'Phát triển hướng kiểm thử (TDD) là gì?',
      'Tôi nên sử dụng framework kiểm thử nào?'
    ]
  },
  {
    id: 12,
    category: 'Tối ưu hóa hiệu suất',
    categoryColor: 'text-amber-500',
    categoryIcon: 'Zap',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&auto=format',
    question: 'Làm thế nào để tối ưu hóa hiệu suất của ứng dụng web của tôi?',
    shortAnswer: 'Tập trung vào tối ưu hóa mã, bộ nhớ đệm, tối ưu hóa hình ảnh và giảm thiểu các yêu cầu HTTP.',
    detailedAnswer: 'Các chiến lược tối ưu hóa hiệu suất web bao gồm: 1) Tối ưu hóa mã - thu nhỏ và nén CSS/JS, xóa mã không sử dụng, 2) Tối ưu hóa hình ảnh - sử dụng các định dạng phù hợp (WebP), nén hình ảnh, tải lười, 3) Bộ nhớ đệm - bộ nhớ đệm trình duyệt, sử dụng CDN, bộ nhớ đệm phía máy chủ, 4) Tối ưu hóa cơ sở dữ liệu - truy vấn hiệu quả, lập chỉ mục, gộp kết nối, 5) Tối ưu hóa mạng - giảm thiểu yêu cầu HTTP, sử dụng HTTP/2, bật nén. Các công cụ như Lighthouse, WebPageTest và DevTools của trình duyệt giúp xác định các điểm nghẽn hiệu suất.',
    tags: ['hiệu suất', 'tối ưu hóa', 'bộ nhớ đệm', 'web-vitals'],
    relatedQuestions: [
      'Core Web Vitals là gì?',
      'Làm thế nào để đo lường hiệu suất trang web?',
      'Tải lười là gì và khi nào tôi nên sử dụng nó?'
    ]
  }
];

// Mock API functions
export const getFAQs = async (category = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredData = faqData;
  
  if (category) {
    filteredData = filteredData.filter(faq => 
      faq.category.toLowerCase().includes(category.toLowerCase())
    );
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
