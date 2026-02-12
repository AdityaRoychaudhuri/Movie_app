import { Client, TablesDB, Query, ID } from 'react-native-appwrite'
// track searches for users


const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

console.log("DB:", DB_ID)
console.log("TABLE:", TABLE_ID)
console.log("ENDPOINT:", process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
console.log("PROJECT:", process.env.EXPO_PUBLIC_APPWRITE_ID)


const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_ID!)

const db = new TablesDB(client)

export const updateSearchCount = async (searchQuery: string, movie: Movie) => {
    // call appwrite api and check if a document exists
    // if found then increment the search count
    // if not found then new search term, thus create a new document for itr
    try {
        const res = await db.listRows({
            databaseId: DB_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal('searchTerm', searchQuery)
            ]
        })

        if (res.rows.length > 0){
            const existingMovie = res.rows[0]

            await db.updateRow(
                DB_ID,
                TABLE_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await db.createRow(
                DB_ID,
                TABLE_ID,
                ID.unique(),
                {
                    searchTerm: searchQuery,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie_title: movie.title
                }
            )
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const showTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const res = await db.listRows({
            databaseId: DB_ID,
            tableId: TABLE_ID,
            queries: [
                Query.limit(5),
                Query.orderDesc('count')
            ]
        })

        return res.rows as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        throw error;
    }
}