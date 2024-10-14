"use client";
import Navbar from "@/app/Components/Navbar";
import { useEffect, useState } from "react";

export default function BookDetails({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      const data = await res.json();
      setBook(data);
    };

    if (id) fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  
  const {
    title,
    authors,
    subjects,
    languages,
    download_count,
    formats,
    bookshelves,
    media_type,
    copyright,
  } = book;

  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <div className="container mx-auto mt-24">
          <div className="max-w-4xl mx-auto bg-white rounded-md border shadow overflow-hidden">
            {/* Book Image */}
            <img
              src={formats["image/jpeg"]}
              alt={title}
              className="w-full h-96 object-cover"
            />
            {/* Book Info */}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>

              <div className="mb-4">
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Author:</span>{" "}
                  {authors.map((author) => author.name).join(", ")}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Subjects:</span>{" "}
                  {subjects?.join(", ")}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Languages:</span>{" "}
                  {languages?.join(", ")}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Download Count:</span>{" "}
                  {download_count}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Bookshelves:</span>{" "}
                  {bookshelves?.join(", ")}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Media Type:</span>{" "}
                  {media_type}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Copyright:</span>{" "}
                  {copyright ? "Yes" : "No"}
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center text-center gap-2 md:gap-4">
                {/* Check for each format and provide download links */}
                {formats["text/plain"] && (
                  <a
                    href={formats["text/plain"]}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    download
                  >
                    Download as Text
                  </a>
                )}
                {formats["application/pdf"] && (
                  <a
                    href={formats["application/pdf"]}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                    download
                  >
                    Download as PDF
                  </a>
                )}
                {formats["application/epub+zip"] && (
                  <a
                    href={formats["application/epub+zip"]}
                    className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200"
                    download
                  >
                    Download as ePub
                  </a>
                )}
                {formats["text/html"] && (
                  <a
                    href={formats["text/html"]}
                    className="bg-orange-500 text-white py-2 px-4    rounded hover:bg-orange-600 transition duration-200"
                    download
                  >
                    Download as HTML
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
