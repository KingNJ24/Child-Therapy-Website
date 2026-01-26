import { useEffect, useRef, useState } from "react";
import "./Stats.css";

const statsData = [
  { value: 7200, label: "Patients Served " },
  { value: 100, label: "Therapies" },
  { value: 14400, label: "Sessions Completed" },
  { value: 30000, label: "Community Members", suffix: "k+" }
];

const Stats = () => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      {statsData.map((item, index) => (
        <StatItem key={index} {...item} start={start} />
      ))}
    </section>
  );
};

const StatItem = ({ value, label, start, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startValue = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / value));

    const counter = setInterval(() => {
      startValue += Math.ceil(value / 100);
      if (startValue >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(startValue);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [start, value]);

  return (
    <div className="stat-box">
      <h2>
        {suffix ? suffix : `${count}+`}
      </h2>
      <p>{label}</p>
    </div>
  );
};

export default Stats;
