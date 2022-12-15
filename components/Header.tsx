

function Header() {
  return (
    <header aria-label="Page Header">
  <div className="mx-auto max-w-screen-xl px-4 py-8  sm:px-6 lg:px-8">
    <div className="flex items-center justify-between">
      <div className="text-left">
        <h1 className="text-3xl text-gray-900 sm:text-4xl font-medium">
          Notes
        </h1>
      </div>
      <div className=" flex gap-4 mt-0 sm:flex-row sm:items-center">
      <button
          className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          type="button"
        >
          Create 
        </button>
        <button
          className="inline-flex items-center justify-center rounded-lg border border-gray-400 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring font-medium text-sm" 
          type="button"
        >
           Edit Tags 
        </button>        
      </div>
    </div>
  </div>
</header>

  )
}

export default Header