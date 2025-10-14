import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import { User, Lock, Camera, Loader2, ArrowLeft } from 'lucide-react';

const ProfilePage = ({ onBack }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage('Mật khẩu không khớp.');
      return;
    }
    setIsLoading(true);
    setMessage('');

    const updates = { name, avatar };
    if (password) {
      updates.password = password;
    }

    const { success, data, message: apiMessage } = await authApi.updateProfile(user.id, updates);
    setIsLoading(false);

    if (success) {
      updateUser(data);
      setMessage('Hồ sơ đã được cập nhật thành công!');
    } else {
      setMessage(apiMessage || 'Đã xảy ra lỗi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5" />
            Quay lại
        </button>
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-center mb-6">Chỉnh sửa hồ sơ</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <img 
                        src={avatar || `https://ui-avatars.com/api/?name=${name}&background=random`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                    />
                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full cursor-pointer hover:bg-blue-700">
                        <Camera className="w-4 h-4 text-white" />
                    </label>
                    <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400">Tên</label>
              <div className="relative mt-1">
                <User className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400">Mật khẩu mới (để trống nếu không đổi)</label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400">Xác nhận mật khẩu mới</label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {message && <p className={`text-center text-sm ${message.includes('thành công') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}

            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Lưu thay đổi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

