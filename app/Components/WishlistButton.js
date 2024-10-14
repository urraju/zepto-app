import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 

export default function WishlistButton({ book, onRemove }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isWishlisted = wishlist.some((item) => item.id === book.id);
    setWishlisted(isWishlisted);
  }, [book.id]);

  const handleWishlistToggle = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlisted) {
      wishlist = wishlist.filter((item) => item.id !== book.id);
      onRemove(book.id); // Call the parent function to remove the book from the UI
      toast.success("Book removed from wishlist!");
    } else {
      wishlist.push(book);
      toast.success("Book added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlisted(!wishlisted);
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className={`text-[15px] font-medium ${
        wishlisted ? "text-red-500" : "text-orange-500"
      }`}
    >
      {wishlisted ? "❤️ Remove from wishlist" : "🤍 Add to wishlist"}
    </button>
  );
}
