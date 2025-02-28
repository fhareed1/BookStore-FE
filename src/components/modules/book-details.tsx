import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { BookDetails as BookDetailsType } from "@/pages/dashboard/dashboard";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import bookService from "@/services/bookServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/useAuth";

interface BookDetailsProps {
  children: ReactNode; // Correct way to type children props
  book: BookDetailsType;
}

const BookDetails = ({
  children,
  book,
  onEdit,
}: BookDetailsProps & { onEdit: (book: BookDetailsType) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: deleteBook, status } = useMutation({
    mutationFn: (bookId: number) => bookService.deleteBooks(bookId),
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Book deleted");
      navigate(0);
    },
    onError: () => {
      toast.error("This book failed to delete");
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent
          className={`flex  ${
            book?.authorId === user?.id ? "gap-3 w-fit px-2" : null
          } `}
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-40 h-56 object-cover rounded-md"
          />

          <div className="flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {book.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-500">
                {book.description}
              </DialogDescription>
            </DialogHeader>
            <p className="text-gray-600">by {book.authorId}</p>

            <div className="mt-4 text-sm text-gray-400">
              <p>📅 Published: {book.published}</p>
              <p>
                🕒 Created At:{" "}
                {book?.createdAt ? book.createdAt.split("T")[0] : "N/A"}
              </p>
              <p>
                🔄 Updated At:{" "}
                {book?.updatedAt ? book.updatedAt.split("T")[0] : "N/A"}
              </p>
            </div>
            <DialogFooter>
              {book?.authorId === user?.id ? (
                <Button type="button" onClick={() => onEdit(book)}>
                  Edit
                </Button>
              ) : null}
              {book?.authorId === user?.id ? (
                <Button
                  type="button"
                  variant={"destructive"}
                  disabled={status === "pending"}
                  onClick={() =>
                    book.id !== undefined && deleteBook(Number(book.id))
                  }
                >
                  {status === "pending" ? (
                    <Loader2 />
                  ) : (
                    <>
                      <Trash2 />
                      Delete book
                    </>
                  )}
                </Button>
              ) : null}
              <Button type="submit">Buy ₦ {book.price}</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookDetails;
