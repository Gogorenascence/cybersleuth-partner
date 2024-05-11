import { db } from "../Firebase"
import {
    getDocs,
    collection,
    query,
    orderBy,
    where,
    limit,
    addDoc,
    setDoc,
    deleteDoc
} from "firebase/firestore"


const partnerQueries = {
    getPartnersData: async function getPartnersData() {
        const partnersCollectionRef = collection(db, "partners")
        const response = await getDocs(partnersCollectionRef);
        const data = response.docs.map((doc) => ({
            ...doc.data(),
        }))
        return data
    },
    getPartnerDataById: async function getPartnerDataById(id) {
        const partnersCollectionRef = collection(db, "partners");
        const partnerQuery = query(
            partnersCollectionRef,
            where("id", "==", id)
        )
        const snapshot = await getDocs(partnerQuery);
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const partnerData = snapshot.docs[0].data();
            return partnerData;
        }
    },
    getRangedQueriedPartnersData: async function getRangedQueriedPartnersData(end, queryList) {
        let partnersCollectionRef = collection(db, "partners");
        console.log(query(partnersCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            partnersCollectionRef = query(partnersCollectionRef, where(key, "==", value));
        }
        partnersCollectionRef = query(
            partnersCollectionRef,
            orderBy("updated_on.full_time", "desc"),
            limit(end)
        )
        const snapshot = await getDocs(partnersCollectionRef)
        console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            return data;
        }
    },
    getQueriedPartnersData: async function getQueriedPartnersData(queryList) {
        let partnersCollectionRef = collection(db, "partners");
        console.log(query(partnersCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            partnersCollectionRef = query(partnersCollectionRef, where(key, "==", value));
        }
        const snapshot = await getDocs(partnersCollectionRef)
        console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            return data;
        }
    },
    createPartner: async function createPartner(partnerData) {
        const partnersCollectionRef = collection(db, "partners")
        addDoc(partnersCollectionRef, partnerData)
        return partnerData
    },
    editPartner: async function editPartner(id, partnerData) {
        const partnersCollectionRef = collection(db, "partners")
        const partnerQuery = query(
            partnersCollectionRef,
            where("id", "==", id)
        );

        const snapshot = await getDocs(partnerQuery);
        if (!snapshot.empty) {

            const partnerDoc = snapshot.docs[0];
            await setDoc(partnerDoc.ref, partnerData);
            return true;
        } else {
            console.log("Partner not found");
            return false;
        }
    },
    deletePartner: async function deletePartner(id) {
        const partnersCollectionRef = collection(db, "partners");
        const partnerQuery = query(
            partnersCollectionRef,
            where("id", "==", id)
        );

        const snapshot = await getDocs(partnerQuery);
        if (!snapshot.empty) {
            // Document exists, delete it
            const partnerDoc = snapshot.docs[0];
            await deleteDoc(partnerDoc.ref);
            return true; // Deletion successful
        } else {
            console.log("Partner not found");
            return false; // Partner not found
        }
    }
}

export default partnerQueries
