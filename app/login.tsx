import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { router } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

const login = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        
    }
  return (
    <View className='flex-1 bg-primary'>
        <Image source={images.bg} className="absolute w-full z-0" resizeMode='cover'/>
        <TouchableOpacity
            className="absolute top-6 left-6 w-11 h-11 rounded-full bg-dark-100/80 justify-center items-center z-50"
            onPress={() => router.back()}
        >
            <Image source={icons.arrow} tintColor="#fff" className='size-8 rotate-180'/>
        </TouchableOpacity>

        

        <View className='flex-1 justify-center px-8'>
            <Image source={icons.logo} className="w-14 h-14 self-center mb-6" resizeMode='contain'/>
            
            <Text className='text-white text-3xl font-bold mb-8'>
                Login
            </Text>

            <TextInput
                className='bg-dark-100 text-white p-4 rounded-xl mb-4'
                placeholder='Email'
                placeholderTextColor="#888"
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                className='bg-dark-100 text-white p-4 rounded-xl mb-4'
                placeholder='Password'
                placeholderTextColor="#888"
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />

            {error ? (
                <Text className="text-red-400 mb-4">
                {error}
                </Text>
            ) : null}

            <TouchableOpacity
                className={`py-4 rounded-xl items-center ${loading ? 'bg-gray-500' : 'bg-accent'}`}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text className='text-white font-semibold'>
                    {loading ? 'Logging in' : 'Login'}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    
  )
}

export default login