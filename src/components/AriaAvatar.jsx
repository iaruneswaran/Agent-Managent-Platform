import React from 'react';
import aiAvatarImg from '../assets/Ai Avatar.png';

/**
 * AriaAvatar - Uses Ai Avatar.png for the AI assistant chatbot avatar.
 */
export const AriaAvatar = ({ size = 50, style = {} }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        borderRadius: '12px',
        overflow: 'hidden',
        ...style
      }}
      aria-label="Wellio AI Assistant"
    >
      <img
        src={aiAvatarImg}
        alt="Wellio AI Assistant"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  );
};

export default AriaAvatar;
