import DefaultLayout from "@/layouts/default";

import SingleChapter from '@/components/Books/Chapters/SingleChapter'

export default function Home() {
  const Books = () => {
    return (
      <DefaultLayout>
        <SingleChapter />   
      </DefaultLayout>
    )
  }

  return (
    <Books />   
  )
}

