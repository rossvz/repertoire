// import { compose } from "redux"
// import { connect } from "react-redux"
// import { firebaseConnect } from "react-redux-firebase"
// import Shows from "./Shows"
// import { values, mapObjIndexed } from "ramda"
// import { sortByDate, formatShows } from "../../util/shows"

// const sortShows = compose(
//   sortByDate,
//   formatShows,
//   values,
//   mapObjIndexed((show, id) => ({ ...show, id }))
// )

// const mapStateToProps = ({ firebase }) => ({
//   shows: sortShows(firebase.data.shows)
// })

// export default compose(
//   firebaseConnect(["shows"]),

//   connect(
//     mapStateToProps,
//     {}
//   )
// )(Shows)
