// Mock API for FAQ data focused on programming learning roadmaps and software engineering technologies

const faqData = [
  {
    id: 1,
    category: 'Kiến thức cơ bản về lập trình',
    categoryColor: 'text-blue-500',
    categoryIcon: 'Code',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop&auto-format',
    question: 'Người mới bắt đầu nên học ngôn ngữ lập trình nào đầu tiên?',
    shortAnswer: 'Python được khuyến nghị rộng rãi cho người mới bắt đầu vì cú pháp đơn giản và tính linh hoạt.',
    detailedAnswer: `
      **Python** là lựa chọn hàng đầu cho người mới bắt đầu vì những lý do sau:
      <br/><br/>
      - **Cú pháp đơn giản, dễ đọc:** Cú pháp của Python rất gần với ngôn ngữ tự nhiên, giúp bạn tập trung vào việc học các khái niệm lập trình cốt lõi (như vòng lặp, biến, cấu trúc điều kiện) thay vì phải vật lộn với các quy tắc phức tạp.
      <br/>
      - **Hệ sinh thái mạnh mẽ:** Python có một thư viện chuẩn khổng lồ và cộng đồng người dùng đông đảo. Điều này có nghĩa là bạn có thể dễ dàng tìm thấy tài liệu, các khóa học và sự hỗ trợ khi gặp khó khăn.
      <br/>
      - **Tính ứng dụng cao:** Ngay cả khi mới bắt đầu, bạn có thể sử dụng Python để xây dựng các dự án thực tế trong nhiều lĩnh vực như phát triển web (với Django, Flask), khoa học dữ liệu, học máy, và tự động hóa các tác vụ hàng ngày.
      <br/><br/>
      Một lựa chọn phổ biến khác là **JavaScript**, đặc biệt nếu bạn muốn tập trung vào phát triển web ngay từ đầu, vì nó là ngôn ngữ duy nhất chạy trực tiếp trên trình duyệt.
    `,
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
    detailedAnswer: `
      Để trở thành một nhà phát triển Full-Stack, bạn cần thành thạo cả công nghệ Frontend và Backend. Lộ trình điển hình bao gồm các giai đoạn sau:
      <br/><br/>
      1.  **Nền tảng Frontend:** Nắm vững bộ ba cốt lõi của web:
          - **HTML:** Xây dựng cấu trúc cho trang web.
          - **CSS:** Tạo kiểu và bố cục cho trang web.
          - **JavaScript:** Thêm tính tương tác và logic phía client.
      <br/>
      2.  **Framework Frontend:** Chọn và học một framework JavaScript hiện đại để xây dựng giao diện người dùng phức tạp hiệu quả hơn, chẳng hạn như **React**, **Vue**, hoặc **Angular**.
      <br/>
      3.  **Ngôn ngữ Backend:** Chọn một ngôn ngữ phía máy chủ để xử lý logic nghiệp vụ, quản lý dữ liệu và xác thực người dùng. Các lựa chọn phổ biến bao gồm **Node.js** (JavaScript), **Python** (Django/Flask), hoặc **Java** (Spring).
      <br/>
      4.  **Cơ sở dữ liệu:** Hiểu cách lưu trữ và truy xuất dữ liệu. Bạn nên tìm hiểu cả hai loại:
          - **SQL (Quan hệ):** PostgreSQL, MySQL.
          - **NoSQL (Không quan hệ):** MongoDB.
      <br/>
      5.  **Công cụ và Kỹ năng khác:**
          - **Git & GitHub:** Hệ thống kiểm soát phiên bản để quản lý mã nguồn.
          - **API:** Học cách thiết kế và làm việc với RESTful API hoặc GraphQL.
          - **Kiến thức về DevOps:** Hiểu biết cơ bản về triển khai ứng dụng, CI/CD và các nhà cung cấp đám mây (AWS, Azure).
    `,
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
    detailedAnswer: `
      Một lập trình viên chuyên nghiệp cần thành thạo bộ công cụ sau để làm việc hiệu quả:
      <br/><br/>
      - **Trình soạn thảo mã (Code Editor/IDE):** Đây là nơi bạn viết mã. **Visual Studio Code (VS Code)** là lựa chọn phổ biến nhất hiện nay nhờ tính linh hoạt và hệ sinh thái extension phong phú. Các IDE mạnh mẽ khác bao gồm **IntelliJ IDEA** (cho Java/Kotlin) và **PyCharm** (cho Python).
      <br/>
      - **Hệ thống kiểm soát phiên bản (Version Control):** **Git** là tiêu chuẩn ngành để theo dõi các thay đổi trong mã nguồn và cộng tác với nhóm. Bạn cũng cần biết cách sử dụng các nền tảng lưu trữ như **GitHub** hoặc **GitLab**.
      <br/>
      - **Giao diện dòng lệnh (Terminal/CLI):** Cung cấp một cách mạnh mẽ để tương tác với hệ điều hành, chạy các lệnh, và quản lý dự án.
      <br/>
      - **Trình quản lý gói (Package Manager):** Công cụ này tự động hóa việc cài đặt và quản lý các thư viện của bên thứ ba. Ví dụ: **npm/yarn** cho Node.js, **pip** cho Python, **Maven** cho Java.
      <br/>
      - **Công cụ gỡ lỗi (Debugger):** Các công cụ tích hợp trong IDE hoặc trình duyệt giúp bạn tìm và sửa lỗi bằng cách theo dõi từng bước thực thi của mã.
      <br/>
      - **Công cụ kiểm thử API (API Client):** **Postman** hoặc **Insomnia** rất cần thiết để kiểm tra các điểm cuối API mà không cần xây dựng giao diện người dùng.
    `,
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
    detailedAnswer: `
      Ngành kỹ thuật phần mềm rất đa dạng với nhiều hướng đi chuyên biệt. Dưới đây là một số con đường sự nghiệp phổ biến:
      <br/><br/>
      - **Lập trình viên Frontend:** Chuyên về phần giao diện người dùng (UI) và trải nghiệm người dùng (UX) của ứng dụng web, làm việc với HTML, CSS, và JavaScript/frameworks.
      <br/>
      - **Lập trình viên Backend:** Tập trung vào logic phía máy chủ, cơ sở dữ liệu, và API để cung cấp năng lượng cho ứng dụng.
      <br/>
      - **Lập trình viên Full-Stack:** Có khả năng làm việc trên cả frontend và backend của một ứng dụng.
      <br/>
      - **Lập trình viên di động:** Xây dựng ứng dụng cho các nền tảng di động như iOS (sử dụng Swift/Objective-C) hoặc Android (sử dụng Kotlin/Java). Cũng có thể phát triển đa nền tảng với React Native hoặc Flutter.
      <br/>
      - **Kỹ sư DevOps:** Kết nối giữa phát triển (Dev) và vận hành (Ops), tập trung vào việc tự động hóa quy trình xây dựng, kiểm thử và triển khai phần mềm.
      <br/>
      - **Kỹ sư dữ liệu / Khoa học dữ liệu:** Làm việc với các tập dữ liệu lớn, xây dựng các đường ống dữ liệu (data pipelines), và áp dụng các thuật toán để phân tích và rút ra thông tin chi tiết.
      <br/>
      - **Kỹ sư học máy (Machine Learning Engineer):** Thiết kế và triển khai các mô hình học máy để giải quyết các vấn đề như nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên.
      <br/>
      - **Kỹ sư bảo mật (Security Engineer):** Chuyên về việc tìm kiếm và vá các lỗ hổng bảo mật trong phần mềm và hệ thống.
    `,
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
    detailedAnswer: `
      Cấu trúc dữ liệu (Data Structures) và Thuật toán (Algorithms) là nền tảng của khoa học máy tính và cực kỳ quan trọng đối với mọi lập trình viên vì:
      <br/><br/>
      -**Viết mã hiệu quả:** Hiểu rõ cách hoạt động của các cấu trúc dữ liệu (như Array, Hash Table, Tree) và thuật toán (như Sắp xếp, Tìm kiếm) cho phép bạn lựa chọn công cụ phù hợp nhất cho từng vấn đề, giúp mã chạy nhanh hơn và sử dụng ít tài nguyên hơn. Ví dụ, tìm kiếm một phần tử trong một Hash Table nhanh hơn rất nhiều so với trong một Array không được sắp xếp.
      <br/>
      -**Kỹ năng giải quyết vấn đề:** Học về thuật toán rèn luyện tư duy logic và khả năng chia nhỏ một vấn đề phức tạp thành các bước đơn giản hơn. Đây là kỹ năng cốt lõi của một kỹ sư phần mềm giỏi.
      <br/>
      -**Yêu cầu phỏng vấn:** Hầu hết các cuộc phỏng vấn kỹ thuật tại các công ty công nghệ lớn đều xoay quanh việc giải quyết các bài toán về cấu trúc dữ liệu và thuật toán. Đây là cách họ đánh giá năng lực giải quyết vấn đề của ứng viên.
      <br/>
      -**Nền tảng cho các lĩnh vực nâng cao:** Kiến thức này là điều kiện tiên quyết để tìm hiểu các chủ đề phức tạp hơn như trí tuệ nhân tạo, học máy, và thiết kế hệ thống quy mô lớn.
    `,
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
    detailedAnswer: `
      Một "ngăn xếp công nghệ" (tech stack) là sự kết hợp của các công nghệ được sử dụng để xây dựng và vận hành một ứng dụng. Trong năm 2024, các ngăn xếp hiện đại thường tập trung vào hiệu suất, trải nghiệm nhà phát triển và khả năng mở rộng. Một số ngăn xếp phổ biến bao gồm:
      <br/><br/>
      - **MERN Stack:** MongoDB (cơ sở dữ liệu), Express.js (framework backend), React (thư viện frontend), Node.js (môi trường runtime). Đây là lựa chọn rất phổ biến cho các ứng dụng sử dụng JavaScript toàn diện.
      <br/>
      - **T3 Stack (Type-Safe Stack):** Next.js (framework React), TypeScript (ngôn ngữ), Tailwind CSS (CSS framework), tRPC (API), Prisma (ORM). Ngăn xếp này đang ngày càng phổ biến vì tính an toàn kiểu dữ liệu từ đầu đến cuối.
      <br/>
      - **Python/Django + React:** Sử dụng sức mạnh của Django cho backend (quản trị, ORM) và sự linh hoạt của React cho frontend.
      <br/>
      - **Serverless Stacks:** Sử dụng các dịch vụ như AWS Lambda, Vercel Functions, và cơ sở dữ liệu như PostgreSQL (qua Neon/Supabase) hoặc Firestore để xây dựng các ứng dụng có khả năng mở rộng cao mà không cần quản lý máy chủ.
      <br/><br/>
      Việc lựa chọn ngăn xếp phụ thuộc vào yêu cầu của dự án, kỹ năng của đội ngũ và hệ sinh thái hỗ trợ.
    `,
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
    detailedAnswer: `
      SQL và NoSQL là hai loại hệ quản trị cơ sở dữ liệu với các triết lý thiết kế khác nhau.
      <br/><br/>
      **Cơ sở dữ liệu SQL (Quan hệ):**
      - **Mô hình dữ liệu:** Dữ liệu được tổ chức trong các bảng có cấu trúc (hàng và cột) với các mối quan hệ được định nghĩa rõ ràng. Ví dụ: **MySQL**, **PostgreSQL**.
      - **Lược đồ (Schema):** Lược đồ được định nghĩa trước và nghiêm ngặt (schema-on-write). Mọi dữ liệu phải tuân theo cấu trúc đã định.
      - **Khả năng mở rộng:** Thường mở rộng theo chiều dọc (vertical scaling) - bằng cách tăng sức mạnh của một máy chủ duy nhất.
      - **Trường hợp sử dụng:** Phù hợp cho các ứng dụng yêu cầu tính toàn vẹn dữ liệu cao, các giao dịch phức tạp (như hệ thống ngân hàng, thương mại điện tử).
      <br/><br/>
      **Cơ sở dữ liệu NoSQL (Không quan hệ):**
      - **Mô hình dữ liệu:** Linh hoạt hơn, có thể là dạng tài liệu (document), cặp khóa-giá trị (key-value), cột rộng (wide-column), hoặc đồ thị (graph). Ví dụ: **MongoDB**, **Redis**.
      - **Lược đồ (Schema):** Lược đồ linh hoạt hoặc không có lược đồ (schema-on-read).
      - **Khả năng mở rộng:** Thường mở rộng theo chiều ngang (horizontal scaling) - bằng cách thêm nhiều máy chủ hơn.
      - **Trường hợp sử dụng:** Lý tưởng cho dữ liệu lớn (big data), ứng dụng thời gian thực, và các ứng dụng có cấu trúc dữ liệu thay đổi thường xuyên.
    `,
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
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&auto-format',
    question: 'Những kiến thức cơ bản về điện toán đám mây dành cho lập trình viên là gì?',
    shortAnswer: 'Điện toán đám mây cung cấp các tài nguyên máy tính theo yêu cầu như máy chủ, lưu trữ và cơ sở dữ liệu qua internet.',
    detailedAnswer: `
      Điện toán đám mây (Cloud Computing) cho phép bạn thuê tài nguyên máy tính từ các nhà cung cấp lớn như **Amazon Web Services (AWS)**, **Google Cloud Platform (GCP)**, và **Microsoft Azure** thay vì phải tự mua và quản lý cơ sở hạ tầng vật lý.
      <br/><br/>
      Đối với lập trình viên, cần hiểu ba mô hình dịch vụ chính:
      <br/><br/>
      1.  **IaaS (Infrastructure as a Service - Hạ tầng như một Dịch vụ):** Cung cấp các khối xây dựng cơ bản nhất như máy chủ ảo (ví dụ: AWS EC2), lưu trữ (AWS S3), và mạng. Bạn có toàn quyền kiểm soát hệ điều hành và ứng dụng.
      <br/>
      2.  **PaaS (Platform as a Service - Nền tảng như một Dịch vụ):** Cung cấp một nền tảng để bạn triển khai ứng dụng mà không cần lo lắng về việc quản lý hạ tầng bên dưới. Ví dụ: **Heroku**, **Vercel**, **AWS Elastic Beanstalk**.
      <br/>
      3.  **SaaS (Software as a Service - Phần mềm như một Dịch vụ):** Cung cấp các ứng dụng hoàn chỉnh mà người dùng có thể truy cập qua internet. Ví dụ: **Google Workspace**, **Salesforce**.
      <br/><br/>
      Lợi ích chính cho lập trình viên là **khả năng mở rộng linh hoạt**, **chi phí trả theo mức sử dụng**, và **tăng tốc độ triển khai** sản phẩm.
    `,
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
    detailedAnswer: `
      Lựa chọn giữa phát triển Native và Đa nền tảng (Cross-Platform) phụ thuộc vào mục tiêu và nguồn lực của bạn.
      <br/><br/>
      **Phát triển Native:**
      - **Công nghệ:** Swift/Objective-C cho **iOS**, Kotlin/Java cho **Android**.
      - **Ưu điểm:**
        - **Hiệu suất tối đa:** Truy cập trực tiếp vào các API và tính năng của hệ điều hành, mang lại hiệu năng tốt nhất.
        - **Trải nghiệm người dùng tốt nhất:** Tuân thủ chặt chẽ các nguyên tắc thiết kế của từng nền tảng.
        - **Cập nhật tính năng mới nhanh nhất.**
      - **Nhược điểm:**
        - **Chi phí và thời gian cao hơn:** Cần duy trì hai codebase riêng biệt cho iOS và Android.
      <br/><br/>
      **Phát triển Đa nền tảng:**
      - **Công nghệ:** **React Native**, **Flutter**, **Xamarin**.
      - **Ưu điểm:**
        - **Tiết kiệm chi phí và thời gian:** Viết mã một lần, chạy trên cả hai nền tảng.
        - **Phát triển nhanh hơn:** Lý tưởng để xây dựng các sản phẩm khả thi tối thiểu (MVP) và đưa ra thị trường nhanh chóng.
      - **Nhược điểm:**
        - **Hiệu suất có thể kém hơn** so với Native, đặc biệt với các tác vụ đồ họa nặng.
        - **Hạn chế** trong việc truy cập một số tính năng đặc thù của nền tảng.
      <br/><br/>
      **Lời khuyên:** Hãy bắt đầu với đa nền tảng nếu bạn muốn phát triển nhanh và có nguồn lực hạn chế. Chọn Native nếu ứng dụng của bạn yêu cầu hiệu suất cao, đồ họa phức tạp hoặc tích hợp sâu với hệ điều hành.
    `,
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
    detailedAnswer: `
      **REST (Representational State Transfer)** là một kiểu kiến trúc phần mềm để thiết kế các ứng dụng mạng. Một **REST API** là một giao diện lập trình ứng dụng tuân thủ các ràng buộc của REST, cho phép các hệ thống khác nhau giao tiếp với nhau qua giao thức HTTP.
      <br/><br/>
      **Các nguyên tắc chính của REST:**
      - **Kiến trúc Client-Server:** Tách biệt giữa giao diện người dùng (client) và lưu trữ dữ liệu (server).
      - **Không trạng thái (Stateless):** Mỗi yêu cầu từ client đến server phải chứa tất cả thông tin cần thiết để server hiểu và xử lý nó. Server không lưu trữ trạng thái của client giữa các yêu cầu.
      - **Giao diện thống nhất:** Sử dụng các phương thức HTTP tiêu chuẩn:
        - **GET:** Lấy dữ liệu (ví dụ: lấy danh sách người dùng).
        - **POST:** Tạo mới dữ liệu (ví dụ: tạo người dùng mới).
        - **PUT/PATCH:** Cập nhật dữ liệu (ví dụ: cập nhật thông tin người dùng).
        - **DELETE:** Xóa dữ liệu (ví dụ: xóa một người dùng).
      <br/><br/>
      **Các bước xây dựng một REST API cơ bản:**
      1.  **Thiết kế tài nguyên (Resources) và các điểm cuối (Endpoints):** Ví dụ: '/users' để thao tác với người dùng.
      2.  **Chọn một framework backend:** Express.js (Node.js), Django REST Framework (Python), Spring Boot (Java).
      3.  **Triển khai các phương thức HTTP** cho mỗi endpoint để thực hiện các thao tác CRUD (Create, Read, Update, Delete).
      4.  **Xử lý yêu cầu và phản hồi:** Định dạng dữ liệu thường là **JSON**.
      5.  **Bảo mật API:** Thêm xác thực (authentication) và phân quyền (authorization).
      6.  **Tài liệu hóa API:** Sử dụng các công cụ như Swagger/OpenAPI để mô tả cách sử dụng API của bạn.
    `,
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
    detailedAnswer: `
      Kiểm thử phần mềm là một phần không thể thiếu để đảm bảo chất lượng. Dưới đây là các loại kiểm thử chính được sắp xếp theo "Kim tự tháp kiểm thử":
      <br/><br/>
      1.  **Kiểm thử đơn vị (Unit Test):**
          - **Mục tiêu:** Kiểm tra các thành phần nhỏ nhất của mã nguồn (như một hàm hoặc một component) một cách độc lập.
          - **Đặc điểm:** Nhanh, rẻ, và nên chiếm số lượng lớn nhất trong các loại kiểm thử.
          - **Công cụ:** Jest, Mocha (JavaScript), Pytest (Python), JUnit (Java).
      <br/>
      2.  **Kiểm thử tích hợp (Integration Test):**
          - **Mục tiêu:** Kiểm tra sự tương tác giữa các đơn vị khác nhau để đảm bảo chúng hoạt động cùng nhau một cách chính xác. Ví dụ: kiểm tra xem một API có trả về đúng dữ liệu khi được gọi từ frontend hay không.
          - **Đặc điểm:** Chậm hơn và phức tạp hơn Unit Test.
      <br/>
      3.  **Kiểm thử đầu cuối (End-to-End Test - E2E Test):**
          - **Mục tiêu:** Mô phỏng một luồng người dùng hoàn chỉnh từ đầu đến cuối trong ứng dụng. Ví dụ: kiểm tra quy trình đăng nhập, thêm sản phẩm vào giỏ hàng và thanh toán.
          - **Đặc điểm:** Chậm nhất và tốn kém nhất, nhưng cung cấp sự tự tin cao nhất về hoạt động của ứng dụng.
          - **Công cụ:** Cypress, Playwright.
      <br/><br/>
      Việc áp dụng một chiến lược kiểm thử cân bằng giữa ba loại này giúp phát hiện lỗi sớm và xây dựng phần mềm đáng tin cậy.
    `,
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&auto-format',
    question: 'Làm thế nào để tối ưu hóa hiệu suất của ứng dụng web của tôi?',
    shortAnswer: 'Tập trung vào tối ưu hóa mã, bộ nhớ đệm, tối ưu hóa hình ảnh và giảm thiểu các yêu cầu HTTP.',
    detailedAnswer: `
      Tối ưu hóa hiệu suất web là một quá trình đa diện, bao gồm các kỹ thuật ở cả phía client và server.
      <br/><br/>
      **Phía Frontend (Client-Side):**
      - **Tối ưu hóa tài nguyên:** Nén và thu nhỏ (minify) các tệp CSS, JavaScript. Xóa bỏ mã không sử dụng (tree-shaking).
      - **Tối ưu hóa hình ảnh:** Nén hình ảnh, sử dụng các định dạng hiện đại như **WebP**, và triển khai kỹ thuật tải lười (lazy loading) cho các hình ảnh nằm ngoài màn hình đầu tiên.
      - **Giảm thiểu yêu cầu mạng:** Gộp các tệp CSS và JS, sử dụng HTTP/2 để cho phép đa hợp yêu cầu.
      - **Tối ưu hóa đường dẫn hiển thị quan trọng (Critical Rendering Path):** Ưu tiên tải các tài nguyên cần thiết để hiển thị nội dung "above the fold" (phần người dùng thấy đầu tiên) một cách nhanh nhất.
      <br/><br/>
      **Phía Backend (Server-Side):**
      - **Sử dụng bộ nhớ đệm (Caching):** Lưu trữ các phản hồi thường xuyên được yêu cầu trong bộ nhớ đệm (ví dụ: sử dụng Redis) để giảm tải cho máy chủ và cơ sở dữ liệu.
      - **Tối ưu hóa truy vấn cơ sở dữ liệu:** Sử dụng chỉ mục (indexes) cho các cột thường được truy vấn, tránh các truy vấn phức tạp không cần thiết.
      - **Sử dụng Mạng phân phối nội dung (CDN):** Đặt các tài sản tĩnh (hình ảnh, CSS, JS) gần hơn với người dùng trên toàn cầu để giảm độ trễ mạng.
      <br/><br/>
      Sử dụng các công cụ như **Google Lighthouse** và **WebPageTest** để đo lường hiệu suất và xác định các điểm cần cải thiện.
    `,
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
