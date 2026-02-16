import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

interface SavedMovieCardProp {
    movie_id: number,
    title: string,
    poster_url: string,
    vote_average: number,
    release_date: string
}

const SavedMovieCard = ({
    movie_id,
    poster_url,
    vote_average,
    release_date,
    title
}: SavedMovieCardProp) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
        <TouchableOpacity className='w-[30%]' activeOpacity={0.9}>
            <View className='relative'>
                <Image
                    source={{
                        uri: poster_url 
                        ? `https://image.tmdb.org/t/p/w500${poster_url}`
                        : 'https://via.placeholder.co/600x400/111/FFF.png' 
                    }}
                    className='w-full h-56 rounded-xl'
                    resizeMode='cover'
                />
                <View className='absolute top-1 right-1 bg-black/60 p-1 rounded-full'>
                    <Image
                        source={icons.saved_full}
                        className='size-6'
                    />
                </View>
            </View>
            <Text className='text-white font-semibold text-sm mt-2' numberOfLines={1}>
                {title}
            </Text>

            <View className='flex-row items-center justify-between mt-1'>
                <View className='flex-row items-center gap-x-1'>
                    <Image source={icons.star} className='size-4'/>
                    <Text className='text-white text-xs font-bold'>
                        {(vote_average/2).toFixed(1)}
                    </Text>
                </View>
                <Text className='text-light-300 text-xs font-medium'>
                    {release_date?.split('-')[0]}
                </Text>   
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default SavedMovieCard