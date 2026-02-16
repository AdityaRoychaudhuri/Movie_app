import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { router } from 'expo-router'

const AccountDetails = () => {
  return (
    <View className='flex-1 bg-primary justify-center'>
        <TouchableOpacity 
        className='absolute h-11 w-11 top-6 left-6 rounded-full bg-dark-100/80 justify-center items-center z-50'
        onPress={() => router.back()}
        >
            <Image source={icons.arrow} className='size-10 rotate-180' tintColor="#fff"/>
        </TouchableOpacity>
        <Text className='text-accent/50 font-semibold text-3xl self-center'>AccountDetails</Text>
    </View>
  )
}

export default AccountDetails