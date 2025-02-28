import apiClient from "@/config/axiosInstance";
import { BookCreateType } from "@/types/book";

const createBook = async (payload: BookCreateType) => {
  try {
    const response = await apiClient.post("/books", payload);
    console.log(response);

    return response;
  } catch (error) {
    console.error("Response status:", error);
    console.error("Response data:", error);
    throw error;
  }
};

const getBooks = async () => {
  const response = await apiClient.get("/books");
  console.log(response);
  return response;
};

const deleteBooks = async (bookId: number) => {
  const response = await apiClient.delete(`/books/${bookId}`);
  return response;
};

const updateBook = async (bookId: number, payload: BookCreateType) => {
  const response = await apiClient.put(`/books/${bookId}`, payload);
  return response;
};

const bookService = {
  createBook,
  getBooks,
  deleteBooks,
  updateBook,
};

export default bookService;
