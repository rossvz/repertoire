import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

export const LogoutButton = ({ logout }) => (
  <div style={styles.buttonStyles} onClick={logout}>
    <FontAwesomeIcon icon={faSignOutAlt} />
    <span>Log Out</span>
  </div>
)

const styles = {
  buttonStyles: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    fontSize: "1em",
    color: "var(--primary)",
    textDecoration: "none",
  },
}
