import { Button } from "../ui/button";
import BookDetails from "../modules/book-details";
import EditBook from "../modals/edit-book-Modal";
import { useState } from "react";

type BookDetailsType = {
  id?: number;
  title: string;
  price: string;
  image: string;
  description: string;
  authorId?: string;
};

type Props = {
  book: BookDetailsType;
};

const BookCard = ({ book }: Props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDetailsType | null>(
    null
  );

  const handleEdit = (book: BookDetailsType) => {
    setSelectedBook({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      description: book.description,
      authorId: book.authorId,
    });
    setEditOpen(true);
  };

  return (
    <>
      <BookDetails
        book={{ ...book, id: book.id?.toString() }}
        onEdit={() => handleEdit(book)}
      >
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-auto h-auto bg-white shadow-lg rounded-2xl">
            <div className="p-auto">
              <img src={book.image} alt="" className="w-[262px] h-[352px]" />
            </div>
          </div>
          <div className="items-center flex flex-col">
            <p className="text-lg font-semibold text-center text-[#393280]">
              {book.title}
            </p>
            <p className="text-sm tracking-[2%] text-[#888888] pt-2 pb-4">
              {book.authorId}
            </p>
            <Button className="text-[#ED553B] text-xl font-bold tracking-[2%]">
              ₦{book.price}
            </Button>
          </div>
        </div>
      </BookDetails>
      <EditBook
        onOpen={editOpen}
        onOpenChange={setEditOpen}
        bookData={selectedBook}
        setBookData={setSelectedBook}
      />
    </>
  );
};

export default BookCard;
