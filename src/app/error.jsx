'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f87171' }}>Something went wrong!</h2>
      <p style={{ marginBottom: '1.5rem', color: '#9ca3af' }}>
        We caught an unexpected error. This might be due to a browser extension or a temporary glitch.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Try again
      </button>
    </div>
  );
}
