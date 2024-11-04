import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputFieldProps } from "../utils/Types";

export default function CheckboxField({ id, label } : InputFieldProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={id} name={id} />
            <Label htmlFor={id}>{label}</Label>
        </div>
    )
}