import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        404 – Page Not Found
      </h1>
      <p className="mb-6 text-gray-600">
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
        Back to Home
      </p>
    </div>
  );
}
