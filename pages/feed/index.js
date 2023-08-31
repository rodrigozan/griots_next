import DefaultLayout from "@/layouts/default";

import Posts from '@/components/Posts/'

export default function HomeFeed() {
  const ListPosts = () => {
    return (
      <DefaultLayout>
        <Posts />
      </DefaultLayout>
    )
  }

  return (
    <ListPosts />
  )
}

