import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { use } from 'react'
import { icons } from '@/constants/icons'
import { useAuth } from '../context/AuthContext'
import { Link, router } from 'expo-router'
import useFetch from '../services/useFetch'
import { getSavedMovies } from '../services/appwrite'
import { images } from '@/constants/images'

const profile = () => {
  const { user, logout } = useAuth()
  const {
    data: savedMovies,
    loading,
    error
  } = useFetch(() => getSavedMovies(user!.$id), !!user?.$id)
  const recentMovies = savedMovies?.slice(0,3);
  if (!user) {
    return (
      <View className='flex-1 bg-primary justify-center px-8 items-center'>
        <Text className='text-white font-bold text-lg m-4'>
          You are not logged in!
        </Text>
        <TouchableOpacity
          className='bg-accent rounded-xl py-4 px-8'
          onPress={() => router.push("/login")}
        >
          <Text className='text-black font-semibold'>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <ScrollView className='flex-1 bg-primary' contentContainerStyle={{ paddingBottom: 120 }}>
      <Image source={images.bg} className='z-0 absolute w-full h-full' resizeMode='stretch'/>
      <View className='items-center mb-10 mt-20'>
        <View className='size-32 rounded-full bg-dark-100 justify-center items-center'>
          <Text className='text-accent text-6xl font-bold'>
            {user?.name?.charAt(0)}
          </Text>
        </View>
        <Text className='text-white text-3xl font-semibold mt-4'>
            {user?.name}
        </Text>
        <Text className='text-light-200 text-lg mt-1'>
            {user?.email}
        </Text>
      </View>

      <View className='bg-dark-100 rounded-3xl p-6 mb-10 mx-6 shadow-lg'>
        <View className='flex-row justify-between'>
          <View className='flex-1 items-center'>
            <Text className='text-white font-bold text-3xl'>
              {savedMovies?.length || 'N/A'}
            </Text>
            <Text className='text-light-200 mt-1'>
              saved
            </Text>
          </View>
        
          <View className='flex-1 items-center'>
            <Text className='text-white font-bold text-3xl'>
              4
            </Text>
            <Text className='text-light-200 mt-1'>
              watched
            </Text>
          </View>

          <View className='flex-1 items-center'>
            <Text className='text-white font-bold text-3xl'>
              2
            </Text>
            <Text className='text-light-200 mt-1'>
              reviews
            </Text>
          </View>
        </View>
      </View>

      <View className='px-6 mb-10'>
        <Text className='text-white text-lg font-semibold mb-4'>
          Recently{' '}
          <Text className='text-accent'>
            Watched
          </Text>
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {recentMovies?.map((movie) => (
            <Link href={`/movie/${movie?.movie_id}`} className='gap-2' key={movie?.$id}>
              <Image
              source={{ uri: movie?.poster_url }}
              className='w-40 h-64 rounded-2xl'
              resizeMode='cover'
            />
            </Link>
          ))}
        </ScrollView>
      </View>

      <View className='bg-dark-100 mx-6 rounded-3xl px-6 py-4'>
        <TouchableOpacity className='py-3 border-b border-dark-200' onPress={(() => router.push('/AccountDetails'))}>
          <View className='flex-row justify-between'>
            <Text className='text-white text-lg'>
              Account
            </Text>
            <Image source={icons.arrow} className='size-8' tintColor="#fff"/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='py-3' onPress={logout}>
          <Text className='text-red-400 text-lg'>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default profile