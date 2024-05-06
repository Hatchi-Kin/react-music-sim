import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PlotGenresProps {
  songPath: string;
}

const PlotGenres: React.FC<PlotGenresProps> = ({ songPath }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(`${baseUrl}/milvus/plot_genres`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_path: songPath,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text(); // Use text() instead of json() if the response is a plain string
      })
      .then((data) => {
        setImage(data);
      })
      .catch((error) => {
        console.error(`Error fetching genre plot: ${error.message}`);
      });
  }, [songPath]);

  return (
    <div className="relative h-full col-span-1 p-2">
      <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full">
        {image && (
          <Image
            src={`data:image/jpeg;base64,${image}`}
            alt="Genre Plot"
            width={600}
            height={600}
            layout="responsive"
            className="rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default PlotGenres;
