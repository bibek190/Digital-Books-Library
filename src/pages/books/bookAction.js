import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const addNewBookAction = (bookObj) => async (dispatch) => {
  try {
    const docRefPromise = addDoc(collection(db, "books"), {
      bookObj,
    });
    toast.promise(docRefPromise, {
      pending: "In progress",
    });
    const docRef = await docRefPromise;
    toast.success("Success");
  } catch (e) {
    toast.error(e.message);
  }
};
