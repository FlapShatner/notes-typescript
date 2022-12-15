import Header from "../components/Header"
import View from "../components/View"
import NotesList from "../components/NotesList"

export default function Home() {
  return (
    <>
      <div className='container mx-auto max-w-screen-xl'>
        <Header/>
        <View />
        <NotesList />
      </div>
    </>
  )
}
