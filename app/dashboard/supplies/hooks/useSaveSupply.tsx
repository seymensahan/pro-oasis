import { firestore } from "@/firebase/config"
import { FormData, ProductDataProps, Supply, SupplyDataProps } from "@/lib/Types"
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { toast } from "react-toastify"
import useGetProducts from "../../product/hooks/useGetProducts"
import useAuth from "@/app/(auth)/Hooks/useAuth"


const useSaveSupply = () => {
    const { user } = useAuth()

    const [supplySaveLoading, setSupplySaveLoading] = useState(false)

    const saveSupply = async (supplyData: FormData) => {
        setSupplySaveLoading(true);
        // setError(null);

        console.log("Attempting to save supply with data:", supplyData);

        try {
            const supplyRef = collection(firestore, "supplies")
            const newSupply = doc(supplyRef)
            const supplyReference = `SPL${Date.now().toString().slice(-4)}`;

            // await getProductByName(supplyData.productName)

            
            const productRef = collection(firestore, "products");
            const q = query(productRef, where("name", "==", supplyData.productName));
            
            // Get the current product data to check and update quantity
            const productSnapshot = await getDocs(q);
            
            if (productSnapshot.empty) {
                toast.error(`Product ${supplyData.productName} not found in inventory`);
                return
            }
            
            const productDoc = productSnapshot.docs[0];
            const currentQuantity = productDoc.data().stock;

            const productPrice = productDoc.data().purchasePrice
            const total = Number(supplyData.quantityPurchased) * productPrice
            
            // if (currentQuantity < supplyData.quantityPurchased) {
            //     toast.error(`Insufficient quantity for product ${supplyData.productName}`);
            //     return
            // }

            // Update product quantity
            const purchasedQty = parseInt(supplyData.quantityPurchased)
            const updatedQuantity = currentQuantity + purchasedQty;
            const productDocRef = doc(firestore, "products", productDoc.id);
            await updateDoc(productDocRef, {
                stock: updatedQuantity,
            });
            
            const supplyDoc = {
                ...supplyData,
                grandTotal: total,
                previousStock: currentQuantity,
                buyer: user?.uid,
                reference: supplyReference,
                createAt: serverTimestamp(),
            }
            await setDoc(newSupply, supplyDoc)
            toast.success("Supply initiated successfully")

        } catch (error: any) {
            toast.error(`Supply failded to be initailed due to ${error.message}`)
        }
    }
    return { saveSupply }
}

export default useSaveSupply