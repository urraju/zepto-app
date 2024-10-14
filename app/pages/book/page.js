"use client";
import BookCard from "@/app/Components/BookCard";
import Navbar from "@/app/Components/Navbar";
import Pagination from "@/app/Components/Pagination";
import SearchBar from "@/app/Components/SearchBar";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
export default function AllBook() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const pageSize = 32;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://gutendex.com/books?page=${page}`);
        const data = await res.json();
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));

        // Extract genres/topics from the book data
        const allGenres = new Set();
        data.results.forEach((book) => {
          book.subjects?.forEach((subject) => {
            allGenres.add(subject);
          });
        });
        setGenres([...allGenres]);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  useEffect(() => {
    // Start with the full list of books as the filtered list
    let filtered = books;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by genre if a genre is selected
    if (selectedGenre) {
      filtered = filtered.filter((book) =>
        book.subjects?.includes(selectedGenre)
      );
    }

    // Update the filtered books state
    setFilteredBooks(filtered);
  }, [searchQuery, books, selectedGenre]);

  return (
    <>
      <div className="container mx-auto">
        <Toaster />
        <Navbar />
        <div className="px-3 lg:px-0 py-20">
          <div className="flex justify-center items-center gap-10">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Genre Dropdown */}
            <div className="my-4">
              <select
                className="p-3 text-sm rounded w-full bg-orange-500 outline-none text-white"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">Filter All Genres</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500">
                Load
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mb-5">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
