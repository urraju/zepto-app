import Link from "next/link";
import WishlistButton from "./WishlistButton";

export default function BookCard({ book, onRemove }) {
  return (
    <div className="p-3 rounded-md shadow border overflow-hidden relative h-[430px]">
      <div className="relative overflow-hidden rounded-md">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-full h-64 object-cover mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-md"
        />
      </div>
      <div>
        <h2 className=" text-lg font-bold">{book.title.slice(0, 30)}</h2>
        <p className="text-[15px] mt-2">
          Author: {book.authors[0]?.name.slice(0, 40)}
        </p>
        <p className="text-[15px] mb-3">
          Genre: {book.subjects?.[0].slice(0, 30)}
        </p>
        <div className="flex justify-end  lg:mt-2 xl:mt-5">
          <Link className="text-sm ml-40" href={`pages/book/${book.id}`}>
            Details &rarr;
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5">
        <WishlistButton book={book} onRemove={onRemove} />
      </div>
    </div>
  );
}
