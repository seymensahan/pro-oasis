import { useState, useEffect } from "react";
import { QuerySnapshot, DocumentData, query, collection, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { ProductDataProps, SupplyDataProps } from "@/lib/Types";
import { useAuth } from "@/context/AuthContext";
import { firestore } from "@/firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";

const useProductDataMap = (userId?: string) => {
    const [productMap, setProductMap] = useState<Record<string, ProductDataProps>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchProducts = async () => {
            try {
                const q = query(collection(firestore, "products"), where("owner", "==", userId));
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.reduce((acc, doc) => {
                    const productData = doc.data() as ProductDataProps;
                    acc[productData.name] = productData;
                    return acc;
                }, {} as Record<string, ProductDataProps>);
                setProductMap(products);
            } catch (err) {
                console.error("Error fetching product data:", err);
                setError("Failed to load product data. Please try again.");
            }
        };

        fetchProducts();
    }, [userId]);

    return { productMap, error };
};

const useSupplyData = () => {
    const { user } = useAuth();

    const [supply, setSupply] = useState<SupplyDataProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { productMap } = useProductDataMap(user?.uid);
    
    const supplyQuery = user ? query(collection(firestore, 'supplies'), where('buyer', '==', user.uid)) : null;
    const [supplySnapshots, loading] = useCollection(supplyQuery);

    useEffect(() => {
        if (loading || !supplySnapshots || !productMap) return;

        const fetchSupplyData = async () => {
            try {
                const fetchedSupplies = await Promise.all(
                    supplySnapshots.docs.map(async (doc) => {
                        const supplyData = doc.data();
                        const productData = productMap[supplyData.productName];

                        if (!productData) {
                            toast.error(`Product "${supplyData.productName}" not found in your inventory, we have ${JSON.stringify(productMap)}`);
                            
                            return null;
                        }

                        return {
                            id: doc.id,
                            supplyProduct: supplyData.productName,
                            category: productData.category,
                            purchasePrice: productData.purchasePrice,
                            unit: productData.unit,
                            quantityPurchased: supplyData.quantityPurchased,
                            supplier: supplyData.supplier,
                            images: productData.images || [],
                        };
                    })
                );

                setSupply(fetchedSupplies.filter((item) => item !== null) as SupplyDataProps[]);
            } catch (err) {
                console.error("Error fetching supplies:", err);
                setError("Failed to load supply data. Please try again.");
            }
        };

        fetchSupplyData();
    }, [supplySnapshots, productMap]);

    return { supply, loading, error };
};

export default useSupplyData;
