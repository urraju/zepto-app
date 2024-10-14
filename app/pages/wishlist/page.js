"use client";
import BookCard from "@/app/Components/BookCard";
import Navbar from "@/app/Components/Navbar";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <>
      <Toaster /> 
      <div className="container mx-auto">
        <Navbar />
        <div className="px-3 lg:px-0 container mx-auto py-20">
          <h1 className="text-2xl font-bold mb-4 m mt-4">
            My <span className="text-orange-500">Wishlist</span>
          </h1>
          {wishlist.length === 0 ? (
            <p>No items in wishlist.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mb-5">
              {wishlist.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onRemove={removeFromWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
