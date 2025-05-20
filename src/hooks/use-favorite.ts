import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoritePlace {
    id: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    addedAt: number;
}

export function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<FavoritePlace[]>("favorites", []);

    const queryClient = useQueryClient();

    const favoritesQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity
    });

    const addToFavorites = useMutation({
        mutationFn: async (place: Omit<FavoritePlace, "id" | "addedAt">) => {
            const newFavorite: FavoritePlace = {
                ...place,
                id: `${place.lat}-${place.lon}`,
                addedAt: Date.now()
            };

            const exists = favorites.some((fav) => fav.id === newFavorite.id);
            if (exists) return favorites;

            const newFavorites = [...favorites, newFavorite].slice(0, 15);

            setFavorites(newFavorites);
            return newFavorites;

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            });
        }
    });

    const removeFavorite = useMutation({
        mutationFn: async (placeId: string) => {
            const newFavorites = favorites.filter((place) => place.id !== placeId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            });
        }
    });

    return { favorites: favoritesQuery.data, addToFavorites, removeFavorite, isFavorite: (lat: number, lon: number) => favorites.some((place) => place.lat === lat && place.lon === lon) };
}
