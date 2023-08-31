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

// CRUD
export const addNewBookAction = (bookObj) => async (dispatch) => {
  try {
    const docRefPromise = addDoc(collection(db, "books"), bookObj);
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("New Book added successfully");
    // TODO: Grab all the books and update store.
  } catch (e) {
    toast.error(e.message);
  }
};

export const getAllBookAction = () => async (dispatch) => {
  try {
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
  }
};

export const getBookAction = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const bookData = docSnap.data();
      dispatch(setSelectedBook({ ...bookData, id }));
    } else {
      toast.error("No book found");
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export const updateBookAction =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      const bookRef = doc(db, "books", id);
      const docRefPromise = setDoc(bookRef, rest, { merge: true });
      toast.promise(docRefPromise, {
        pending: "In Progress...",
      });
      await docRefPromise;
      dispatch(getAllBookAction());
      toast.success("Book updated successfully");
      // TODO: Grab all the books and update store.
    } catch (e) {
      toast.error(e.message);
    }
  };

export const deleteBookAction = (id) => async (dispatch) => {
  try {
    const bookRef = doc(db, "books", id);
    const docRefPromise = deleteDoc(bookRef);
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("Deleted");
    dispatch(getAllBookAction());
    // TODO: Grab all the books and update store.
  } catch (e) {
    toast.error(e.message);
  }
};
