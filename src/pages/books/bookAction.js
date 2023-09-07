import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { setBooks, setSelectedBook } from "./bookSlice";
// Create all CURD action

// Create
export const addNewBookAction = (bookObj) => async (dispatch) => {
  try {
    const docRefPromise = addDoc(collection(db, "books"), bookObj);
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("New Book Added Successfully");
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

// Read data from firebase
export const getAllBookAction = () => async (dispatch) => {
  try {
    // Grab book info from Firebase
    const querySnapshot = await getDocs(collection(db, "books"));
    const books = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      books.push({ ...data, id });
    });
    dispatch(setBooks(books));
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

// Read data from firebase for a given bookId
export const getBookAction = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const bookInfo = docSnap.data();
      dispatch(setSelectedBook({ ...bookInfo, id }));
    } else {
      toast.error("Fo Book Found");
    }
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

export const updateBookAction =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      const docRef = doc(db, "books", id);
      const docSnapPromise = setDoc(docRef, rest, { merge: true });
      toast.promise(docSnapPromise, {
        pending: "In Progress...",
      });
      await docSnapPromise;
      toast.success("Book Updated Successfully");
      dispatch(getAllBookAction());
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

export const deleteBookAction = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "books", id);
    const docSnapPromise = deleteDoc(docRef);
    toast.promise(docSnapPromise, {
      pending: "In Progress...",
    });
    await docSnapPromise;
    toast.success("Book Deleted");
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};
