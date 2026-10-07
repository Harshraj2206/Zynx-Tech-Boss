import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedList({
  children,
  className = '',
  itemClassName = '',
}) {
  const items = React.Children.toArray(children);

  return (
    <div className={`flex flex-col space-y-2.5 ${className}`}>
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={item.key || index}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 30,
            }}
            className={itemClassName}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
