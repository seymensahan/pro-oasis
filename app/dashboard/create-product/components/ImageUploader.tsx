import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { ImageUploaderProps } from "../utils/Types"



export default function ImageUploader({ images, setImages }: ImageUploaderProps) {

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedImages = Array.from(event.target.files)
        }
    }

    const handleImageRemove = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    }

    return (
        <div>
            <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-1"
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={typeof image === "string" ? image : URL.createObjectURL(image)}
                            alt="Uploaded preview"
                            className="w-full h-auto object-cover"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                            onClick={() => handleImageRemove(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}