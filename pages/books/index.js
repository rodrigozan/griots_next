import DefaultLayout from "@/layouts/default";

import ListBook from '@/components/Books/ListBook'

export default function HomeBooks() {
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

