import Link from "next/link";

function Header() {
  return (
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-20">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
              Notes
            </h1>
          </div>
          <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
            <Link href="/create">
              <button
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
              >
                Create
              </button>
            </Link>
            <button
              className="inline-flex items-center justify-center rounded-lg border border-indigo-400 px-5 py-3 text-indigo-500 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring font-medium text-sm"
              type="button"
            >
              Edit Tags
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
