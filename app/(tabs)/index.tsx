import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import useFetch from "../services/useFetch";
import { fetchMovies } from "../services/api";
import MoviesCard from "../components/MoviesCard";
import { showTrendingMovies } from "../services/appwrite";
import TrendingCard from "../components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(showTrendingMovies)

  const { 
    data: movies, 
    loading: movieLoading, 
    error: movieError 
  } = useFetch(() => fetchMovies({
    query: ''
  }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle = {{
          minHeight: "100%",
          paddingBottom: 10
        }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

        {movieLoading || trendingLoading
        ? (<ActivityIndicator
          size='large'
          color="#0000ff"
          className="self-center mt-10"
        />)
        : movieError || trendingError
        ? (<Text>Error: {movieError?.message || trendingError?.message}</Text>)
        : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder='Search Movies'
            />

            {trendingMovie && (
              <View className="mt-8">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending{' '}
                  <Text className="text-accent">
                    Movies
                  </Text>
                </Text>

              </View>
            )}

            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4"/>}
                data={trendingMovie}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index}/>
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest{' '}
                <Text className="text-accent">
                  Movies
                </Text>
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MoviesCard
                    {...item}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
          )
        }
      </ScrollView>
    </View>
  );
}
