import { useState, useCallback, useEffect } from 'react';
import { useQuery, queryCache } from 'react-query'
import axios from 'axios';
import { ReactQueryDevtools } from 'react-query-devtools'

const fetcher = (key, number) => axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`).then(({ data }) => data);

const Index = () => {
  const [number, setNumber] = useState(1);
  const { data, error } = useQuery(['pokemon-fetch', number], fetcher);
  const handleIncrease = useCallback(() => { setNumber(number + 1), [number, setNumber]})
  const handleDecrease = useCallback(() => { setNumber(number - 1 < 1 ? number : number - 1), [number, setNumber]})

  useEffect(() => {
    const prefechData = async() => {
      await queryCache.prefetchQuery(['pokemon-fetch', number + 1], fetcher);
    };

    prefechData();
  }, [number])

  return (
    <div className="l-index">
      {!data && !error && 'Loading...'}
      {data && !error && (
        <>
          <p>{data.name} #{data.order}</p>
          <img src={data.sprites.front_default} alt={`${data.name}-sprite`} />
          <img src={data.sprites.front_shiny} alt={`${data.name}-shiny-sprite`} />
        </>
      )}
      <button
        type="button"
        onClick={handleIncrease}
      >
        Next Pokemon
      </button>
      <button
        type="button"
        onClick={handleDecrease}
      >
        Previous Pokemon
      </button>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )

}

export default Index;
