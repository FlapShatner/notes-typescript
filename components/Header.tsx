import { useSession, signIn, signOut } from "next-auth/react"
import Button from "./Button";
import Link from "next/link";
import ButtonOutline from "./ButtonOutline";
function Header() {
  const { data: session } = useSession()

  function handleClick() {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }
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
              <Button> Create</Button>
            </Link>
            <Link href="/tags">
              <ButtonOutline>Edit Tags</ButtonOutline>
            </Link>
            <div onClick={handleClick}>
              <Button> {session? "Sign Out" : "Sign In"} </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
