import React from 'react';

export default function ElectricBorder({
  children,
  color = '#FF453A',
  className = '',
  innerClassName = '',
}) {
  return (
    <div
      className={`relative p-[1px] rounded-[24px] overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}66, ${color}22, ${color}44)`,
        boxShadow: `0 8px 32px -8px ${color}25`,
      }}
    >
      <div className={`relative z-10 rounded-[23px] bg-ios-secondary-bg h-full w-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
