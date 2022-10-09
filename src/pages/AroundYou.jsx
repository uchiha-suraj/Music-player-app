import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  console.log("around you", country);

  // Because of some get request error from 'geo.ipify.org' api, I've made India as the default country.

  // useEffect(() => {
  //   axios
  //     .get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
  //     .then((res) => setCountry(res?.data?.location.country))
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country !== '') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          (song.artists && song.images &&
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          )
        ))}
      </div>
    </div>
  )
}

export default AroundYou;
