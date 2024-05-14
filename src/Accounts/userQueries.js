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



const userQueries = {
    getPartnersData: async function getPartnersData() {
        const usersCollectionRef = collection(db, "users")
        const response = await getDocs(usersCollectionRef);
        const data = response.docs.map((doc) => ({
            ...doc.data(),
        }))
        return data
    },
    getPartnerDataById: async function getPartnerDataById(id) {
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(
            usersCollectionRef,
            where("id", "==", id)
        )
        const snapshot = await getDocs(userQuery);
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const userData = snapshot.docs[0].data();
            return userData;
        }
    },
    getRangedQueriedPartnersData: async function getRangedQueriedPartnersData(end, queryList) {
        let usersCollectionRef = collection(db, "users");
        console.log(query(usersCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            usersCollectionRef = query(usersCollectionRef, where(key, "==", value));
        }
        usersCollectionRef = query(
            usersCollectionRef,
            orderBy("dateConverted", "desc"),
            limit(end)
        )
        const snapshot = await getDocs(usersCollectionRef)
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
        let usersCollectionRef = collection(db, "users");
        console.log(query(usersCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            usersCollectionRef = query(usersCollectionRef, where(key, "==", value));
        }
        const snapshot = await getDocs(usersCollectionRef)
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
        let usersCollectionRef = collection(db, "users");
        let queryRef = query(usersCollectionRef, where("tamer_id", "==", tamer_id));
        if (queryList) {
            if (queryList.userName !== "") {
                queryRef = query(queryRef, where("name", "==", queryList.userName));
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
    createPartner: async function createPartner(userData) {
        const usersCollectionRef = collection(db, "users")
        addDoc(usersCollectionRef, userData)
        return userData
    },
    editPartner: async function editPartner(id, userData) {
        const usersCollectionRef = collection(db, "users")
        const userQuery = query(
            usersCollectionRef,
            where("id", "==", id)
        );

        const snapshot = await getDocs(userQuery);
        if (!snapshot.empty) {

            const userDoc = snapshot.docs[0];
            await setDoc(userDoc.ref, userData);
            return true;
        } else {
            console.log("Partner not found");
            return false;
        }
    },
    deletePartner: async function deletePartner(id) {
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(
            usersCollectionRef,
            where("id", "==", id)
        );

        const snapshot = await getDocs(userQuery);
        if (!snapshot.empty) {
            // Document exists, delete it
            const userDoc = snapshot.docs[0];
            await deleteDoc(userDoc.ref);
            return true; // Deletion successful
        } else {
            console.log("Partner not found");
            return false; // Partner not found
        }
    },
    getTamerNames: async function getTamerNames() {
        const usersCollectionRef = collection(db, "users")
        const response = await getDocs(usersCollectionRef);
        const data = response.docs.map((doc) => ({
            ...doc.data(),
        }))
        return data
    }
    // transferAllPartners: function transferAllPartners() {
    //     let allPartners = require("../../src/Database/users.json")
    //     const usersCollectionRef = collection(db, "users")
    //     for (let user of allPartners) {
    //         addDoc(usersCollectionRef, user)
    //     }
    // },
}

export default userQueries
