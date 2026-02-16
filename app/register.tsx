import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { router } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

const register = () => {
    const { register } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegistry() {
        setError("");
        setLoading(true);

        try {
            await register(email, password, name);
            router.replace('/(tabs)/profile');
        } catch (err: any) {
            setError(err?.message || "Registration Error.");
        }
    }

  return (
    <View className='flex-1 bg-primary'>
        <Image source={images.bg} className='w-full h-full absolute' resizeMode='cover'/>

        <TouchableOpacity 
        className='absolute top-6 left-6 w-11 h-11 rounded-full bg-dark-100/80 justify-center items-center z-50'
        onPress={() => router.back()}
        >
            <Image source={icons.arrow} className='size-10 rotate-180' tintColor="#fff"/>
        </TouchableOpacity>

        <View className='flex-1 justify-center px-8'>
            <Image source={icons.logo} className='size-14 self-center mb-6 bottom-6' resizeMode='contain'/>
            <Text className='text-white text-3xl font-bold text-start mb-8'>
                Create Account
            </Text>

            <TextInput
                className='bg-dark-100 text-white rounded-xl p-4 mb-4'
                placeholder='Full name'
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                className='bg-dark-100 text-white rounded-xl p-4 mb-4'
                placeholder='Email'
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
            />
            <TextInput
                className='bg-dark-100 text-white rounded-xl p-4 mb-4'
                placeholder='Password'
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error ? (
                <Text className='text-red-400 mb-4'>
                    {error}
                </Text>
            ) : null}

            <TouchableOpacity 
                className={`py-4 rounded-xl items-center ${loading ? 'bg-gray-400' : 'bg-accent'}`}
                onPress={handleRegistry}
                disabled={loading}
            >
                <Text className='text-white font-semibold'>
                    {loading ? 'Creating account...' : 'Register'}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default register