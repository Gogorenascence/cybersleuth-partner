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
            orderBy("dateConverted", "desc"),
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
    getPartnersListData: async function getPartnersListData(tamer_id, queryList) {
        let partnersCollectionRef = collection(db, "partners");
        let queryRef = query(partnersCollectionRef, where("tamer_id", "==", tamer_id));
        if (queryList) {
            if (queryList.partnerName !== "") {
                queryRef = query(queryRef, where("name", "==", queryList.partnerName));
            }
            if (queryList.digimonName !== "") {
                queryRef = query(queryRef, where("currentForm.name", "==", queryList.digimonName));
            }
            if (queryList.wantedEvoName !== "") {
                queryRef = query(queryRef, where("wantedEvos", "array-contains", queryList.wantedEvoName));
            }
            if (queryList.move !== "") {
                queryRef = query(queryRef, where("moves", "array-contains", queryList.move));
            }
            if (queryList.stage !== "") {
                queryRef = query(queryRef, where("currentForm.stage.name", "==", queryList.stage));
            }
        }
        const snapshot = await getDocs(queryRef)
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
    },
    // transferAllPartners: function transferAllPartners() {
    //     let allPartners = require("../../src/Database/partners.json")
    //     const partnersCollectionRef = collection(db, "partners")
    //     for (let partner of allPartners) {
    //         addDoc(partnersCollectionRef, partner)
    //     }
    // },
}

export default partnerQueries
