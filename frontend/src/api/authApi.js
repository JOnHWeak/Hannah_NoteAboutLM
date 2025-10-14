const USERS_KEY = 'hannah-users';
const SESSION_KEY = 'hannah-session';

// Helper to get users from localStorage
const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (e) {
    return [];
  }
};

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  async signup({ email, password, name }) {
    await delay();
    const users = getStoredUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email đã tồn tại.' };
    }
    const newUser = { id: Date.now().toString(), email, password, name, avatar: '' };
    users.push(newUser);
    saveUsers(users);
    return { success: true, data: { id: newUser.id, email: newUser.email, name: newUser.name, avatar: newUser.avatar } };
  },

  async login({ email, password }) {
    await delay();
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Email hoặc mật khẩu không đúng.' };
    }
    const sessionData = { id: user.id, email: user.email, name: user.name, avatar: user.avatar };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    return { success: true, data: sessionData };
  },

  async logout() {
    await delay();
    localStorage.removeItem(SESSION_KEY);
    return { success: true };
  },

  async checkSession() {
    await delay(100); // Check session faster
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) {
      return { success: false, data: null };
    }
    return { success: true, data: JSON.parse(sessionData) };
  },

  async updateProfile(userId, { name, password, avatar }) {
    await delay();
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, message: 'Không tìm thấy người dùng.' };
    }
    const user = users[userIndex];
    if (name) user.name = name;
    if (password) user.password = password; // In a real app, this would be hashed
    if (avatar) user.avatar = avatar;
    users[userIndex] = user;
    saveUsers(users);

    // Update session data as well
    const sessionData = { id: user.id, email: user.email, name: user.name, avatar: user.avatar };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

    return { success: true, data: sessionData };
  },

  resetPassword: async ({ email }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (!existingUser) {
      return {
        success: false,
        message: 'Email không tồn tại trong hệ thống.'
      };
    }

    // In a real application, you would send an email with a reset link
    // For demo purposes, we'll just generate a new password and update it
    const newPassword = 'newpassword123';
    existingUser.password = newPassword;

    console.log(`Mật khẩu mới cho ${email}: ${newPassword}`);

    return {
      success: true,
      message: `Mật khẩu mới đã được tạo: ${newPassword}. Trong ứng dụng thực tế, thông tin này sẽ được gửi qua email.`
    };
  },
};
