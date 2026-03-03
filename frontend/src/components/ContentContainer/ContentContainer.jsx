import clsx from 'clsx';
import { pageContainer } from '@/styles/shared.css';

export function ContentContainer({ children, className = '' }) {
  return <div className={clsx(pageContainer, className)}>{children}</div>;
}
