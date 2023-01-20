import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, where, query } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const FirebaseContext = createContext(null);

const firebaseConfig = {
   apiKey: "AIzaSyAZwdG5hbtIDfSGJHOhXbS6rnBiwPYfklM",
   authDomain: "kismart-b2eed.firebaseapp.com",
   projectId: "kismart-b2eed",
   storageBucket: "kismart-b2eed.appspot.com",
   messagingSenderId: "918548186293",
   appId: "1:918548186293:web:096a6030b18b02d430eafc"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {

   const [user, setUser] = useState(null);
   const [currUser, setCurrUser] = useState(null);
   const [isFarmer, setIsFarmer] = useState(false);
   const [isCustomer, setIsCustomer] = useState(false);

   useEffect(() => {
      onAuthStateChanged(firebaseAuth, e => {
         if (e) {
            console.log(e);
            setUser(e.uid);
            setCurrUser(e)
         }
         else {
            setUser(null);
            setIsFarmer(false);
            setIsCustomer(false);
         }
      })
   }, [])

   const signUpUserWithEmailAndPassword = (userName, email, password, isFarmer, isCustomer, district) => createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      cred => addDoc(collection(firestore, "users"), {
         id: cred.user.uid,
         userName: userName,
         email: email,
         isFarmer: isFarmer,
         isCustomer: isCustomer,
         district: district,
      })
   );

   const logInUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

   const addProducts = async (productName, category, description, price, quantity, photo) => {
      const imageRef = ref(storage, `uploads/images/${Date.now()}-${photo.name}`);
      const photoUrl = await uploadBytes(imageRef, photo);
      return await addDoc(collection(firestore, "products"), {
         productName: productName,
         category: category,
         description: description,
         price: price,
         quantity: quantity,
         photoUrl: photoUrl.ref.fullPath,
         id: user,
         email: currUser.email,
         postedBy: user,
         boughtBy: "",
      });
   }

   const ListAllProducts = () => {
      return getDocs(collection(firestore, "products"));
   };

   const ListAllUsers = () => {
      return getDocs(collection(firestore, "users"));
   };

   const getUserDetails = async () => {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("id", "==", user));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
         setIsFarmer(doc.data().isFarmer)
         setIsCustomer(doc.data().isCustomer)
      });
   }

   const imageUrl = (path) => {
      return getDownloadURL(ref(storage, path));
   };

   const logOut = () => firebaseAuth.signOut();

   const [propsDetailedProduct, setPropsDetailedProduct] = useState({});

   const isLoggedIn = user ? true : false;
   getUserDetails();

   return (
      <FirebaseContext.Provider
         value={{
            signUpUserWithEmailAndPassword,
            logInUserWithEmailAndPassword,
            isLoggedIn,
            logOut,
            isFarmer,
            setIsFarmer,
            isCustomer,
            addProducts,
            ListAllProducts,
            imageUrl,
            ListAllUsers,
            user,
            propsDetailedProduct,
            setPropsDetailedProduct
         }}
      >
         {props.children}
      </FirebaseContext.Provider>
   )
}; 