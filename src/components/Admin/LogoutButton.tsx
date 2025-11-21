import type { CSSProperties } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

interface LogoutButtonProps {
  logout: () => void
}

export const LogoutButton = ({ logout }: LogoutButtonProps) => (
  <div style={styles.buttonStyles} onClick={logout}>
    <FontAwesomeIcon icon={faSignOutAlt} />
    <span>Log Out</span>
  </div>
)

const styles: Record<string, CSSProperties> = {
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
