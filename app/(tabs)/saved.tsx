import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback } from 'react'
import { icons } from '@/constants/icons'
import { useAuth } from '../context/AuthContext'
import { router } from 'expo-router'
import { getSavedMovies } from '../services/appwrite'
import useFetch from '../services/useFetch'
import { images } from '@/constants/images'
import MoviesCard from '../components/MoviesCard'
import SavedMovieCard from '../components/SavedMovieCard'
import { fetchMovieDetails } from '../services/api'

const saved = () => {
  const { user } = useAuth();

  const fetchSavedMovies = useCallback(() => {
    if (!user?.$id) return Promise.resolve([]);
    return getSavedMovies(user.$id)
  },[user?.$id])

  const {
    data: savedMovies,
    loading,
    error
  } = useFetch(fetchSavedMovies, !!user?.$id )

  if (!user){
    return (
      <View className='flex-1 bg-primary justify-center items-center px-8'>
        <Text className='text-white text-xl font-bold m-4'>
          Login to view saved movies!
        </Text>

        <TouchableOpacity 
          className='bg-accent rounded-xl py-4 px-8'
          onPress={() => router.push('/login')}
          >
          <Text className='text-black font-semibold'>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className='bg-primary flex-1 '>
      <Image 
        source={images.bg}
        className='flex-1 absolute w-full'
        resizeMode='cover'
      />

      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <SavedMovieCard {...(item as any)}/>}
        keyExtractor={(item) => item.$id.toString()}  
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle = {{
          paddingBottom: 40
        }}
        ListHeaderComponent={
          <>
            {/* Logo */}
            <View className="w-full flex-row justify-center mt-20 mb-10">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            {/* Title */}
            <View className="mt-5 mb-2">
              <Text className="text-2xl text-white font-bold">
                Saved{' '}
                <Text className="text-accent">
                  Movies
                </Text>
              </Text>

              {savedMovies?.length! > 0 && (
                <View className="mt-2 bg-white/10 self-start px-3 py-1 rounded-full">
                  <Text className="text-xs text-gray-300">
                    {savedMovies?.length} saved
                  </Text>
                </View>
              )}
            </View>

            {loading && (
              <ActivityIndicator
                color="#8B5CF6"
                size="large"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 my-3">
                Error loading saved movies
              </Text>
            )}
          </>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-20 items-center px-5">

              <Image
                source={icons.save}
                className="w-12 h-12 opacity-60"
              />

              <Text className="text-white text-lg font-semibold mt-6">
                Nothing saved yet
              </Text>

              <Text className="text-gray-500 text-center mt-2">
                Movies you bookmark will appear here
              </Text>

            </View>
          ) : null
        }
      />
    </View>
  )
}

export default saved