import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"

export default function AddSalesModal() {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add Sales</h2>
                    <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Select>
                                <SelectTrigger id="customerName">
                                    <SelectValue placeholder="Newest" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Choose date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label htmlFor="supplier">Supplier</Label>
                            <Select>
                                <SelectTrigger id="supplier">
                                    <SelectValue placeholder="Newest" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <div className="flex">
                            <Input id="productName" placeholder="Please type product code and select" className="rounded-r-none" />
                            <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Purchase Price($)</TableHead>
                                <TableHead>Discount($)</TableHead>
                                <TableHead>Tax(%)</TableHead>
                                <TableHead>Tax Amount($)</TableHead>
                                <TableHead>Unit Cost($)</TableHead>
                                <TableHead>Total Cost($)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Product 1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>100.00</TableCell>
                                <TableCell>0.00</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell>10.00</TableCell>
                                <TableCell>110.00</TableCell>
                                <TableCell>110.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="flex justify-end space-x-4">
                        <div className="text-right">
                            <p>Order Tax</p>
                            <p>Discount</p>
                            <p>Shipping</p>
                            <p className="font-bold">Grand Total</p>
                        </div>
                        <div className="text-right">
                            <p>$ 0.00</p>
                            <p>$ 0.00</p>
                            <p>$ 0.00</p>
                            <p className="font-bold">$ 0.00</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="orderTax">Order Tax</Label>
                            <Input id="orderTax" type="number" placeholder="0" />
                        </div>
                        <div>
                            <Label htmlFor="discount">Discount</Label>
                            <Input id="discount" type="number" placeholder="0" />
                        </div>
                        <div>
                            <Label htmlFor="shipping">Shipping</Label>
                            <Input id="shipping" type="number" placeholder="0" />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2 p-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600">Submit</Button>
                </div>
            </div>
        </div>
    )
}