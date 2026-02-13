import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '../services/useFetch';
import { fetchMovieDetails } from '../services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProp{
  label: string,
  info?: string | number | null
}

const MovieInfo = ({ label, info }: MovieInfoProp) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>
    <Text className='font-bold text-light-200 text-sm mt-2'>
      {info || 'N/A'}
    </Text>
  </View>
)

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading
  } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{
        paddingBottom: 80
      }}>
        <View>
          <Image source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
          }}
          className='w-full h-[550px]'
          resizeMode='stretch'
          />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm'>
              {movie?.runtime}m
            </Text>
          </View>
          <View className='flex-row items-center bg-dark-100 py-1 px-2 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-white text-sm font-bold'>
              {Math.round(movie?.vote_average??0)}/10
            </Text>
            <Text className='text-light-200 text-sm'>
              ({ movie?.vote_count } votes)
            </Text>
          </View>
          <MovieInfo label='Overview' info={movie?.overview}/>
          <MovieInfo label='Genres' info={movie?.genres?.map((g: any) => g.name).join(' - ') || 'N/A'}/>
          <View className='flex flex-row justify-between w-64'>
            <MovieInfo label='Budget' info={`$${movie?.budget / 1000000} million`}/>
            <MovieInfo label='Revenue' info={`$${Math.round(movie?.revenue / 1_000_000)} million`}/>
          </View>
          <MovieInfo label='Production Companies' info={movie?.production_companies?.map((c: any) => c.name).join(' - ') || 'N/A'}/>

        </View>
      </ScrollView>

      <TouchableOpacity 
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row justify-center z-50'
        onPress={router.back}
      >
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
        <Text className='text-white'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails