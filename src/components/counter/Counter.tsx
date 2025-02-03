import { useState, useEffect } from "react";

const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / 100); // Tăng dần theo bước
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 20); // Cập nhật sau mỗi 20ms

    return () => clearInterval(interval);
  }, [target]);

  return (
    <span className="text-4xl 2xl:text-5xl font-semibold">{`${count.toLocaleString()}+`}</span>
  );
};

export default Counter;
