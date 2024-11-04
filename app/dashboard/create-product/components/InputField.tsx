import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputFieldProps } from "../utils/Types";

export default function InputField({ id, label, required = false, error, type = "text", placeholder = "", handle }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={id} type={type} placeholder={placeholder}  required={required} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}