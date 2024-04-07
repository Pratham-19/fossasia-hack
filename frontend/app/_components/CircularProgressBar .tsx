import React from "react";

interface CircularProgressBarProps {
  values: number[];
  colors: string[];
  radius: number;
  total: string;
  sum: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  values,
  colors,
  radius,
  total,
  sum,
}) => {
  const strokeWidth = 25;
  const diameter = 2 * radius;
  const cx = diameter / 2;
  const cy = diameter / 2;
  let offset = 0;

  return (
    <div className="relative">
      <svg height={diameter} width={diameter} className="mx-auto rounded-full">
        {values.map((value, index) => {
          const progress = (value / 100) * 360;
          const color = colors[index] || "#4F495F";
          const style = {
            strokeWidth,
            strokeDasharray: `${progress} 360`,
            strokeDashoffset: offset,
            stroke: color,
          };
          offset -= progress;

          return (
            <circle
              key={index}
              className="fill-none"
              strokeWidth={strokeWidth}
              cx={cx}
              cy={cy}
              r={radius}
              style={style}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-3xl">Total</p>
        <h4 className="text-4xl font-semibold">{total}</h4>
        <p className="text-3xl">GHO</p>
      </div>
    </div>
  );
};

const MyCircularProgressBar = ({
  values,
  total,
}: {
  values: number[];
  total: string;
}) => {
  const colors = ["#052F46", "#63A4F0", "#A9CBFF"];
  const radius = 100;

  return (
    <div className="flex justify-center">
      <CircularProgressBar
        values={values}
        colors={colors}
        radius={radius}
        total={total}
        sum={values.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )}
      />
    </div>
  );
};

export default MyCircularProgressBar;
