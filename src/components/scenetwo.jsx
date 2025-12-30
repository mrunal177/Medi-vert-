import { useEffect, useRef, useState } from "react";

const steps = [
  "Thrown in dustbins",
  "Reaches landfills",
  "Enters groundwater",
  "Returns to us",
];

const SceneTwo = () => {
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      stepRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <section className="bg-[#F5F1E9] text-gray-900">
      {steps.map((text, idx) => (
        <div
          key={idx}
          ref={(el) => (stepRefs.current[idx] = el)}
          data-index={idx}
          className={`h-screen flex items-center justify-center transition-all duration-700 ${
            activeStep === idx
              ? "opacity-100 translate-y-0"
              : "opacity-30 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-center max-w-3xl text-[#3B8650]">
            {text}
          </h2>
        </div>
      ))}
    </section>
  );
};

export default SceneTwo;
