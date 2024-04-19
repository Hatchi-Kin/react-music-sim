import React, { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';


const ArtistList = () => {
    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.music-sim.fr/music_library/random', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setArtist(data.row);  // Assuming the data contains a 'row' object with the artist details
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);
    const fetchArtist = useCallback(() => {
        setIsLoading(true);
        fetch('https://api.music-sim.fr/music_library/random', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setArtist(data.row);  // Assuming the data contains a 'row' object with the artist details
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchArtist();
    }, [fetchArtist]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!artist) return <div>No artist found</div>;

    return (
        <div>
            <button
                onClick={fetchArtist}
                className="mt-5 mb-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Refresh Artist
            </button>
            <div className="mt-5 p-7">
                <Card
                    className="bg-[#111827] rounded-lg border-none text-white shadow-lg p-4">
                    <h3 className="text-lg font-bold p-2">
                        {artist.artist} - {artist.title}
                    </h3>
                    <p className="text-sm p-2">
                        Album: {artist.album}, Track: {artist.tracknumber}, Year: {artist.year}
                    </p>
                </Card>
            </div>
        </div>
    );
}

export default ArtistList;
