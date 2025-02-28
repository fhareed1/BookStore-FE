import BookCard from "@/components/cards/book-card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import bookService from "@/services/bookServices";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export type BookDetails = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  description?: string;
  image?: string;
  published?: string;
  author?: string;
  authorId?: string;
  price?: string;
};

const Dashboard = () => {
  const { data: bookRes, status: bookStatus } = useQuery({
    queryKey: ["books"],
    queryFn: bookService.getBooks,
  });

  const book = bookRes?.data;

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "BookStore" },
      ]}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 gap-5">
        {bookStatus === "pending" ? (
          <Loader className="flex justify-center align-middle" />
        ) : !book || book.length === 0 ? (
          <p>No books found</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          book.map((bookItem: any) => (
            <BookCard key={bookItem.id} book={bookItem} />
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
