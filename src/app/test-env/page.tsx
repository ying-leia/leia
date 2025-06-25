export default function TestEnv() {
  return (
    <div>
      NEXT_PUBLIC_BACKEND_URL: {process.env.NEXT_PUBLIC_BACKEND_URL || 'undefined'}
    </div>
  );
} 