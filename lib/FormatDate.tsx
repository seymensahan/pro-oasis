import { Timestamp } from "firebase/firestore";

const formatDate = (timestamp: Timestamp | null): string => {
    if (!timestamp) {
        return "-"; // Or return "" if you prefer an empty string
    }
    
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default formatDate;