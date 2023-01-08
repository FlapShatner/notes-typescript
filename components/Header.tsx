import { useSession, signIn, signOut } from "next-auth/react"
import Button from "./buttons/Button";
import Link from "next/link";
import ButtonOutline from "./buttons/ButtonOutline";
import {useRouter} from "next/router"
function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  function handleClick() {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }
  return (
    <header aria-label="Page Header">
      <div className="mx-auto lg:mx-20 max-w-screen-xl px-4 lg:px-0 py-8 ">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mr-auto mb-6 sm:mb-0">
            <h1 className="text-4xl text-gray-900 font-medium">
              Notes
            </h1>
          </div>
          <div className="flex flex-row justify-between mt-0 gap-6 sm:gap-4 sm:items-center">
            <Link href="/create">
              <Button > Create</Button>
            </Link>
            <Link href="/tags">
              <ButtonOutline >Edit Tags</ButtonOutline>
            </Link>
            <div onClick={handleClick}>
              <Button > {session? "Sign Out" : "Sign In"} </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
