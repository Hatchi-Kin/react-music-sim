import React, { useCallback, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const fetchArtist = useCallback(() => {
        setIsLoading(true);
        const token = localStorage.getItem('authToken') ?? ''; // Get token from local storage

        // Logging all local storage key-value pairs for debugging purposes
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // @ts-ignore
            const value = localStorage.getItem(key) ?? '';
            console.log(`${key}: ${value}`);
        }
        console.log(`Token used for request: ${token}`);

        fetch("https://api.music-sim.fr/music_library/artists", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}` // Use token in Authorization header
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                const cleanedData = data.map(artist => artist.replace('MegaSet/', ''));
                setArtists(cleanedData);
            } else {
                throw new Error('Data format is incorrect, expected an array of strings');
            }
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
            if (error.message.includes("401")) { // Checking specifically for authorization errors
                router.push('/sign-in'); // Redirect to sign-in page if unauthorized
            }
        });
    }, [router]);

    useEffect(() => {
        fetchArtist();
    }, [fetchArtist]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 p-7">
                {artists.length > 0 ? (
                    artists.map((artist, index) => (
                        <div key={index} className="block">
                            <Card className="bg-[#111827] rounded-lg border-gray-400 text-white shadow-lg p-4 hover:bg-gradient-to-r from-teal-800 to-teal-200 transition-colors duration-300">
                                <h3 className="text-lg font-bold p-2">
                                    {artist}
                                </h3>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No artists available</p>
                )}
            </div>
        </div>
    );
}

export default ArtistList;
