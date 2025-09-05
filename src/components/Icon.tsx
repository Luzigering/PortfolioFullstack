interface IconProps {
  children: React.ReactNode;
  href: string;  
  className?: string; 
}

export default function Icon({ children, href, className }: IconProps) {
  return (
    <a href={href}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-6 h-6 block ml-5 ${className || ''}`}
    >
      {children}
    </svg></a>
  );
}
