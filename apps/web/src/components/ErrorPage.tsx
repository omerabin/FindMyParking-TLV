import React from 'react';

export const ErrorPage: React.FC<{ error?: Error; reset?: () => void }> = ({
  error,
  reset,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          An unexpected error occurred. Please try refreshing the page or
          contact support if the problem persists.
        </p>

        {error ? (
          <details className="mt-4 text-left text-xs text-gray-500 dark:text-gray-400">
            <summary className="cursor-pointer">Error details</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
          </details>
        ) : null}

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh
          </button>
          {reset ? (
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md"
            >
              Try again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
