import React, { useEffect, useState, useRef } from 'react';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 1.2,
  className = '',
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
}) {
  const [currentValue, setCurrentValue] = useState(from);
  const prevToRef = useRef(from);

  useEffect(() => {
    let startTimestamp = null;
    const startVal = prevToRef.current;
    const endVal = Number(to) || 0;
    const totalDuration = duration * 1000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = startVal + (endVal - startVal) * ease;

      setCurrentValue(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        prevToRef.current = endVal;
        setCurrentValue(endVal);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [to, duration]);

  const formatted = Number(currentValue).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`inline-block tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
