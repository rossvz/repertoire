import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";
import showIfAuthenticated from "util/showIfAuthenticated";
import AdminFunctions from "./AdminFunctions";

export default showIfAuthenticated(AdminFunctions);
