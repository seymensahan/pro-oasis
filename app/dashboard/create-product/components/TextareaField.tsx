import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputFieldProps } from "../utils/Types";

export default function TextareaField({ id, label, error, required = false, placeholder = "" }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Textarea id={id} name={id} placeholder={placeholder} required={required} className="min-h-[100px]" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}