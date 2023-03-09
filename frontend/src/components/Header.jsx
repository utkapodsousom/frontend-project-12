import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts';

const Header = () => {
  const { logout, user } = useAuthContext();
  const { token } = user;

  const handleLogout = (e) => {
    e.preventDefault();

    logout();
  };

  const link = () => {
    if (token) {
      return (
        <button
          type="button"
          className="text-sm font-medium text-gray-400 hover:text-gray-200"
          onClick={handleLogout}
        >
          Log out
        </button>
      );
    }
    return (
      <a
        href="/login"
        className="text-sm font-medium text-gray-400 hover:text-gray-200"
      >
        Sign in
      </a>
    );
  };

  return (
    <header className="header bg-slate-800 relative">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="ml-4 flex lg:ml-0">
            <Link
              to="/"
              className="block text-white"
            >
              <span className="sr-only">Hexlet Chat</span>
              <h1 className="font-bold text-lg">Hexlet Chat</h1>
            </Link>
          </div>
          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              {link()}
              <span
                className="h-6 w-px bg-gray-400"
                aria-hidden="true"
              />
              <a
                href="/signup"
                className="text-sm font-medium text-gray-400 hover:text-gray-200"
              >
                Create account
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;