import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase-config";
import { setAdmin } from "./useSlice";
export const getUserAction = (uid) => async (dispatch) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      dispatch(setAdmin({ ...userData, uid }));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    toast.error(e.message);
  }
};
