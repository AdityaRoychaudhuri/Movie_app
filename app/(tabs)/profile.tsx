import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { useAuth } from '../context/AuthContext'
import { router } from 'expo-router'

const profile = () => {
  const { user, loading } = useAuth();
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
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image source={icons.person} tintColor="#fff" className='size-10'/>
        <Text className='text-gray-500 text-base'>Profile</Text>
      </View>
    </View>
  )
}

export default profile