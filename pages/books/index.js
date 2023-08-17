import DefaultLayout from "@/layouts/default";

import ListBook from '@/components/Books/ListBook'

export default function Home() {
  const Books = () => {
    return (
      <DefaultLayout>
        <ListBook />
      </DefaultLayout>
    )
  }

  return (
    <Books />
  )
}
