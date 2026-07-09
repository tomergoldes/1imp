import React from "react";
import { LucideIcon } from "lucide-react";

export interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  accentColor?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Themed Wrapper for Generic Icons
// Adds the distinctive 1IMP motion arc and impact dot behind any standard icon
// ─────────────────────────────────────────────────────────────────────────────
interface ThemeIconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
  accentColor?: string;
  strokeWidth?: number;
}

export const ThemeIconWrapper: React.FC<ThemeIconWrapperProps> = ({
  icon: Icon,
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  strokeWidth = 2,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: "absolute", inset: 0, opacity: 0.8 }}
      >
        {/* Dynamic sweeping arc */}
        <path
          d="M 3 21 C 0 11 11 0 21 3"
          stroke={accentColor}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        {/* Impact dot */}
        <circle cx="21" cy="3" r="1.5" fill={accentColor} />
      </svg>
      <Icon
        width={size * 0.75}
        height={size * 0.75}
        color={color}
        strokeWidth={strokeWidth}
        style={{ position: "relative", zIndex: 1 }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Fully Custom Hand-Crafted SVGs
// ─────────────────────────────────────────────────────────────────────────────

export const CustomArrowRight: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Sweeping Arc */}
    <path
      d="M 4 12 C 4 5 10 2 17 4"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    {/* Impact dot */}
    <circle cx="19" cy="12" r="1.4" fill={accentColor} />
    {/* Blade / Arrow */}
    <path
      d="M 5 12 L 19 12 M 12 5 L 19 12 L 12 19"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomCheck: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 3 13 C 2 7 8 3 15 3"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="21" cy="5" r="1.4" fill={accentColor} />
    <path
      d="M 5 13 L 10 18 L 20 6"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomMail: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 2 20 C 0 10 10 0 20 2"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="22" cy="10" r="1.4" fill={accentColor} />
    <path
      d="M 3 7 L 12 13 L 21 7"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomMapPin: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 6 22 C 0 14 0 6 12 1"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="12" cy="10" r="1.4" fill={accentColor} />
    <path
      d="M 21 10 C 21 17 12 23 12 23 C 12 23 3 17 3 10 C 3 5.02944 7.02944 1 12 1 C 16.9706 1 21 5.02944 21 10 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomBriefcase: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 2 20 C 0 10 10 0 20 2"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="16" cy="3" r="1.4" fill={accentColor} />
    <rect
      x="2"
      y="7"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 16 21 V 5 C 16 3.89543 15.1046 3 14 3 H 10 C 8.89543 3 8 3.89543 8 5 V 21"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomChevronRight: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 4 20 C 2 12 8 4 15 2"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="15" cy="12" r="1.4" fill={accentColor} />
    <path
      d="M 9 18 L 15 12 L 9 6"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomChevronDown: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 2 8 C 8 2 18 4 22 10"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="12" cy="15" r="1.4" fill={accentColor} />
    <path
      d="M 6 9 L 12 15 L 18 9"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomChevronLeft: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 20 4 C 22 12 16 20 9 22"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="9" cy="12" r="1.4" fill={accentColor} />
    <path
      d="M 15 18 L 9 12 L 15 6"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CustomMessageSquare: React.FC<CustomIconProps> = ({
  size = 24,
  color = "currentColor",
  accentColor = "#E8355A",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M 3 13 C 2 6 8 2 15 2"
      stroke={accentColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <circle cx="19" cy="8" r="1.4" fill={accentColor} />
    <path
      d="M 21 15 C 21 15.5304 20.7893 16.0391 20.4142 16.4142 C 20.0391 16.7893 19.5304 17 19 17 H 7 L 3 21 V 5 C 3 4.46957 3.21071 3.96086 3.58579 3.58579 C 3.96086 3.21071 4.46957 3 5 3 H 19 C 19.5304 3 20.0391 3.21071 20.4142 3.58579 C 20.7893 3.96086 21 4.46957 21 5 V 15 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
