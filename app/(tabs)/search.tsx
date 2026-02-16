import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { images } from '@/constants/images'
import useFetch from '../services/useFetch'
import { fetchMovies } from '../services/api'
import MoviesCard from '../components/MoviesCard'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import SearchBar from '../components/SearchBar'
import { showTrendingMovies, updateSearchCount } from '../services/appwrite'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchMovieData = useCallback(() => {
    return fetchMovies({ query: searchQuery })
  }, [searchQuery])

  const { 
    data: movies, 
    loading: movieLoading, 
    error: movieError,
    refetch: loadMovies,
    reset
  } = useFetch(fetchMovieData)

  // Load popular movies on component mount
  useEffect(() => {
    const timeOutId = setTimeout(
      async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        await loadMovies(); // Reload popular movies when search is cleared
      }
    },500);

    return () => clearTimeout(timeOutId)

  }, [searchQuery])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchQuery.trim() && movies?.length > 0){
        updateSearchCount(searchQuery, movies[0]);
      }
    }, 500);

    return () => clearTimeout(timeOut);
  }, [movies])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full' resizeMode='cover'/>
      
      <FlatList 
        data={movies?.slice(0,6)}
        renderItem={({ item }) => <MoviesCard {...item}/>}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 20
        }}
        scrollEnabled={false}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>
            <View className='my-5'>
              <SearchBar 
                placeholder='Search Movies'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {movieLoading && (
              <ActivityIndicator color="#0000ff" size='large' className='my-3'/>
            )}

            {movieError && (
              <Text className='text-red-500 px-5 my-3'>
                Error loading movies : {movieError?.message}
              </Text>
            )}
            
            {!movieLoading && !movieError && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                {searchQuery.trim() ? (
                  <>
                    Search result for{' '}
                    <Text className='text-accent'>
                      {searchQuery}
                    </Text>
                  </>
                ) : (
                  <>
                    Trending{' '}
                    <Text className='text-accent'>
                      Now
                    </Text>
                  </>
                )}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? "No movies found" : ""}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search


