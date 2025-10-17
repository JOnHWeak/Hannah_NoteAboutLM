import React from 'react';

// Reusable brand logo: gradient "Hannah" + plain "Learn About"
// Use this everywhere to keep branding consistent
const BrandLogo = ({ size = 'md' }) => {
  const sizes = {
    sm: {
      hannah: 'text-xl',
      learn: 'text-lg',
      gap: 'gap-2',
    },
    md: {
      hannah: 'text-2xl',
      learn: 'text-xl',
      gap: 'gap-2',
    },
    lg: {
      hannah: 'text-3xl',
      learn: 'text-2xl',
      gap: 'gap-3',
    },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${s.gap}`}>
      <span className={`${s.hannah} font-bold bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent`}>
        Hannah
      </span>
      <span className={`${s.learn} text-gray-300`}>Learn About</span>
    </div>
  );
};

export default BrandLogo;

