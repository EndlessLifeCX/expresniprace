import Image from 'next/image';
import './Logo.scss';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`logo ${className}`}>
      <Image
        src="/logoPrace.png"
        alt="Expresní Práce Logo"
        width={54}
        height={34}
        priority
        unoptimized
        className="logo-image"
      />
    </div>
  );
}
