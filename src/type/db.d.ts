interface WithId<T> extends T {
  _id: string
}

interface essay {
  text?: string
  imgUrl?: string
  date: number | string
}

type SRL<T> = T & {_id: string}

