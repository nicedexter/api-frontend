export async function getStaticProps() {
  const res = await fetch('http://127.0.0.1:4444')
  const { data, error } = await res.json()
  console.log(data)

  return { props: { data, error } }
}

export default function Explore({ data, error }) {
  const isLoading = !error && !data

  return (
    <div className="p-4 shadow rounded bg-white">
      <p className="text-purple-500 leading-normal">
        {isLoading ? <div>loading</div> : data.map((n) => <p>{n.label}</p>)}
      </p>
    </div>
  )
}

/* import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())

export function useSwapi() {
  const { data, error } = useSWR(`/api/swapi`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
} */
