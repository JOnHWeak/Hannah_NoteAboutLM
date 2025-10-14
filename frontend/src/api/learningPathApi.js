const learningPathData = {
  'kỹ thuật phần mềm': {
    simplify: {
      interactiveList: [
        { title: 'Giáo trình Nhập môn Kỹ thuật phần mềm', description: 'Tổng quan về các khái niệm cơ bản và quy trình phát triển phần mềm.', image: '/images/ktpm-icon-1.png', link: '/path/to/pdf1.pdf' },
        { title: 'Phân tích và Thiết kế hướng đối tượng', description: 'Tìm hiểu về UML và các mẫu thiết kế phổ biến.', image: '/images/ktpm-icon-2.png', link: '/path/to/pdf2.pdf' },
      ],
      relatedContent: {
        websites: [
          { title: 'TopDev Blog', description: 'Các bài viết chuyên sâu về công nghệ và kỹ thuật phần mềm.', link: 'https://topdev.vn/blog' },
          { title: 'Viblo', description: 'Cộng đồng chia sẻ kiến thức lập trình và công nghệ.', link: 'https://viblo.asia/' },
        ],
      },
    },
    goDeeper: {
        interactiveList: [
            { title: 'Giáo trình Chuyên sâu Kỹ thuật phần mềm', description: 'Nghiên cứu các mô hình phát triển nâng cao và quản lý dự án.', image: '/images/ktpm-icon-3.png', link: '/path/to/pdf3.pdf' },
            { title: 'Kiểm thử và Đảm bảo chất lượng phần mềm', description: 'Các kỹ thuật kiểm thử, tự động hóa và quy trình QA/QC.', image: '/images/ktpm-icon-4.png', link: '/path/to/pdf4.pdf' },
        ],
        definitions: [
            { term: 'Agile', definition: 'Một phương pháp phát triển phần mềm linh hoạt, tập trung vào việc lặp lại và tăng trưởng.' },
            { term: 'Scrum', definition: 'Một framework trong Agile, quản lý công việc thông qua các sprint ngắn.' },
        ],
        faqs: [
            { question: 'Học Kỹ thuật phần mềm bắt đầu từ đâu?', answer: 'Nên bắt đầu với kiến thức nền tảng về lập trình (C++, Java), sau đó học về cấu trúc dữ liệu, giải thuật và các mô hình phát triển.' },
            { question: 'Sự khác biệt giữa KTPM và Khoa học máy tính?', answer: 'KTPM tập trung vào quy trình xây dựng phần mềm, trong khi KHMT tập trung vào lý thuyết tính toán và thuật toán.' },
        ],
        relatedContent: {
            websites: [
                { title: 'Martin Fowler Blog', description: 'Các bài viết chuyên sâu về kiến trúc và thiết kế phần mềm.', link: 'https://martinfowler.com/' },
                { title: 'Refactoring Guru', description: 'Tìm hiểu về các mẫu thiết kế và kỹ thuật tái cấu trúc mã nguồn.', link: 'https://refactoring.guru/' },
            ],
        },
    },
    getImages: {
      images: [
        { src: '/images/ktpm-gallery-1.jpg', caption: 'Mô hình phát triển phần mềm Agile' },
        { src: '/images/ktpm-gallery-2.jpg', caption: 'Sơ đồ UML trong phân tích thiết kế' },
        { src: '/images/ktpm-gallery-3.jpg', caption: 'Quy trình kiểm thử tự động' },
        { src: '/images/ktpm-gallery-4.jpg', caption: 'Kiến trúc Microservices' },
      ],
    },
  },
};

export const getLearningPath = (topic) => {
  const normalizedTopic = topic.toLowerCase();
  return learningPathData[normalizedTopic] || null;
};

