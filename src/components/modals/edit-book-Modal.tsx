import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import bookService from "@/services/bookServices";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/store/useAuth";

// Define the types first - these should be adapted based on your actual application types
type BookDetailsType = {
  id?: number;
  title: string;
  price: string;
  image: string;
  description: string;
  authorId?: string;
};

type BookFormData = {
  title: string;
  price: string;
  image: string;
  description: string;
};

type EditBookProps = {
  onOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookData: BookDetailsType | null;
  setBookData: React.Dispatch<React.SetStateAction<BookDetailsType | null>>;
};

const EditBook = ({
  onOpen,
  onOpenChange,
  bookData,
  setBookData,
}: EditBookProps) => {
  // const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(bookData?.image);
  const [uploading, setUploading] = useState<boolean>(false);
  const [changeImage, setChangeImage] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate: editBook, status } = useMutation({
    mutationFn: ({
      bookId,
      payload,
    }: {
      bookId: number;
      payload: BookFormData;
    }) => bookService.updateBook(bookId, payload),
    onSuccess: () => {
      toast.success("Book Updated Successfully");
      // Reset form
      setBookData(null);
      setFile(null);
      setPreview(undefined);
      setChangeImage(false);
      // Close sheet
      onOpenChange(false);
      navigate(0);
    },
    onError: () => {
      toast.error("Book Update failed");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    // Use a type cast or check that bookData exists first
    if (bookData) {
      setBookData({
        ...bookData,
        [id]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "book-store-image");

      // Make sure your cloud name is correct
      const response = await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error details:", errorData);
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const imgData = await response.json();
      const imageURL = imgData.secure_url.toString(); // Use secure_url instead of url

      // Update bookData state with new image URL
      if (bookData) {
        setBookData({
          ...bookData,
          image: imageURL,
        });
      }

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Image failed to upload: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form and check if bookData exists
    if (!bookData) {
      toast.error("Book data is missing");
      return;
    }

    if (!bookData.title) {
      toast.error("Please enter a title");
      return;
    }

    if (!bookData.image) {
      toast.error("Please upload an image");
      return;
    }

    // Check for ID and ensure it's a number
    if (!bookData.id) {
      toast.error("Book ID is missing");
      return;
    }

    const bookId = Number(bookData.id);
    if (isNaN(bookId)) {
      toast.error("Invalid book ID");
      return;
    }

    const payload: BookFormData = {
      title: bookData.title,
      price: bookData.price,
      image: bookData.image,
      description: bookData.description,
    };

    editBook({ bookId, payload });
  };

  return (
    <>
      <Sheet open={onOpen} onOpenChange={onOpenChange}>
        <SheetContent className="overflow-y-auto overflow-x-hidden p-4">
          <SheetHeader>
            <SheetTitle>Edit book</SheetTitle>
            <SheetDescription>
              Update your book here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <form
            className="grid gap-8 py-4 overflow-auto"
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={bookData?.title || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <div className="relative flex items-center col-span-3 w-full">
                <span className="absolute left-3 text-gray-500">₦</span>
                <Input
                  id="price"
                  type="number"
                  value={bookData?.price || ""}
                  onChange={handleInputChange}
                  className="pl-6 w-full"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right w-full">
                Image
              </Label>
              <div className="w-full min-h-32 col-span-3 flex flex-col items-center justify-center rounded-xl border border-dashed p-4 overflow-hidden">
                {!changeImage && bookData?.image ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={bookData.image}
                      alt="Current book cover"
                      className="max-h-32 object-cover rounded-lg shadow-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setChangeImage(true)}
                      className="mt-2"
                    >
                      Change Image
                    </Button>
                  </div>
                ) : !preview ? (
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaCloudUploadAlt className="text-4xl text-gray-500" />
                    <span className="text-gray-600 mt-2 text-sm">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <>
                    {/* Show Image Preview */}
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-4 max-h-32 object-cover rounded-lg shadow-lg"
                    />

                    <div className="mt-4 flex space-x-2">
                      <Button
                        type="button"
                        onClick={uploadImage}
                        disabled={uploading}
                        className="px-4 py-2"
                      >
                        {uploading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Upload"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setFile(null);
                          setPreview(undefined);
                          if (bookData?.image) {
                            setChangeImage(false);
                          }
                        }}
                        className="px-4 py-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right w-full">
                Description
              </Label>
              <Textarea
                id="description"
                value={bookData?.description || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <SheetFooter className="mt-10">
              <Button type="submit" disabled={status === "pending"}>
                {status === "pending" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditBook;
