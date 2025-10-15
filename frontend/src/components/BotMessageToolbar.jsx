import React from 'react';
import {
    Minus,
    MoreHorizontal,
    Image as ImageIcon,
    ThumbsUp,
    ThumbsDown,
    Share2
} from 'lucide-react';

const BotMessageToolbar = ({ onAction }) => {
    return (
        <div className="flex items-center gap-2 mt-4">
            <button
                onClick={() => onAction('simplify')}
                className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
                <Minus className="w-4 h-4 mr-2" />
                Đơn giản
            </button>
            <button
                onClick={() => onAction('goDeeper')}
                className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
                <MoreHorizontal className="w-4 h-4 mr-2" />
                Tìm hiểu sâu hơn
            </button>
            <button
                onClick={() => onAction('getImages')}
                className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
                <ImageIcon className="w-4 h-4 mr-2" />
                Lấy hình ảnh
            </button>
            <div className="flex-grow"></div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <ThumbsUp className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <ThumbsDown className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <Share2 className="w-4 h-4" />
            </button>
        </div>
    );
};

export default BotMessageToolbar;
