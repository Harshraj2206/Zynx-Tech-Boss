import React, { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-cyan-400 opacity-70 font-mono',
  animateOn = 'mount',
}) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    let iteration = 0;
    const target = text;
    const chars = useOriginalCharsOnly ? text : CHARACTERS;

    const runDecryption = () => {
      interval = setInterval(() => {
        setDisplayText(() => {
          return target
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (sequential) {
                if (index < iteration / 2) {
                  return target[index];
                }
              } else {
                if (iteration > maxIterations) {
                  return target[index];
                }
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });

        iteration++;

        if (iteration > (sequential ? target.length * 2 : maxIterations)) {
          clearInterval(interval);
          setDisplayText(target);
        }
      }, speed);
    };

    runDecryption();

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential, useOriginalCharsOnly]);

  return (
    <span className={`inline-block ${parentClassName}`}>
      <span className={className}>{displayText}</span>
    </span>
  );
}
