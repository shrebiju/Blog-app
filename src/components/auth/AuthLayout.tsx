import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
};

export const AuthLayout = ({
  children,
  title,
  footerText,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        {children}
        <p className="text-center text-sm text-gray-600">
          {footerText}{' '}
          <Link to={footerLink} className="text-blue-600 hover:underline font-medium">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};