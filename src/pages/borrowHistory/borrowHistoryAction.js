import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { getAllBookAction, updateBookAction } from "../books/bookAction";
import { setBorrowHistories } from "./borrowSlice";
// Create all CURD action

// Create
export const addNewBorrowAction = (borrowObj) => async (dispatch) => {
  try {
    const docRefPromise = addDoc(collection(db, "borrow_history"), borrowObj);
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("Successfully");

    dispatch(
      updateBookAction({
        id: borrowObj.bookId,
        isAvailable: false,
        availableFrom: borrowObj.availableFrom,
      })
    );

    
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

// Read data from firebase
export const getAllBorrowHistoryAction = () => async (dispatch) => {
  try {
    // Grab book info from Firebase
    const querySnapshot = await getDocs(collection(db, "borrow_history"));
    const history = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      history.push({ ...data, id });
    });
    dispatch(setBorrowHistories(history));
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

export const updateHistoryAction =
  ({ id, ...rest }) =>
  async (dispatch) => {
    try {
      const docRef = doc(db, "borrow_history", id);
      const docSnapPromise = setDoc(docRef, rest, { merge: true });
      toast.promise(docSnapPromise, {
        pending: "In Progress...",
      });
      await docSnapPromise;
      toast.success("Updated Successfully");
      dispatch(getAllBorrowHistoryAction());
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

// // Read data from firebase for a given bookId
// export const getBookAction = (id) => async (dispatch) => {
//   try {
//     const docRef = doc(db, "books", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const bookInfo = docSnap.data();
//       dispatch(setSelectedBook({ ...bookInfo, id }));
//     } else {
//       toast.error("Fo Book Found");
//     }
//   } catch (e) {
//     toast.error(e.message);
//     console.log(e);
//   }
// };

// export const deleteBookAction = (id) => async (dispatch) => {
//   try {
//     const docRef = doc(db, "books", id);
//     const docSnapPromise = deleteDoc(docRef);
//     toast.promise(docSnapPromise, {
//       pending: "In Progress...",
//     });
//     await docSnapPromise;
//     toast.success("Book Deleted");
//   } catch (e) {
//     toast.error(e.message);
//     console.log(e);
//   }
// };
