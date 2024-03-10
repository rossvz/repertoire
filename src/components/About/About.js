import React from "react"
import { Header } from "../Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import Button from "../common/Button"

const About = (props) => {
  return (
    <div style={styles.aboutContainer}>
      <Header title={"About Me"} />
      <div style={{ paddingLeft: "3em", paddingRight: "3em" }}>
        <p>
          I am a singer & guitar player in the Atlanta, Georgia area where I
          perform acoustic covers at local restaurants and private events. Thank
          you for using this app! I hope it will be a fun way for us to interact
          during our time together. Grab some food, pull up a chair, and let's
          sing some songs.
        </p>
        <p>-- Randy Godwin</p>
      </div>

      <div style={styles.socialButtons}>
        <a
          style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
          href="https://www.instagram.com/randy.godwin.music/?utm_source=ig_embed&utm_campaign=loading"
          target="_blank"
        >
          <Button>
            <div style={styles.instagram}>
              <span>Instagram</span>
              <FontAwesomeIcon
                style={styles.instagramIcon}
                icon={faInstagram}
              />
            </div>
          </Button>
        </a>
        <a
          style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
          href="https://www.facebook.com/randygodwinmusic"
          target="_blank"
        >
          <Button>
            <div style={styles.instagram}>
              <span>Facebook</span>
              <FontAwesomeIcon style={styles.instagramIcon} icon={faFacebook} />
            </div>
          </Button>
        </a>
      </div>
    </div>
  )
}

const styles = {
  aboutContainer: {
    color: "white",
    textAlign: "justify",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  socialButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  instagram: {
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  instagramIcon: {
    fontSize: "30px",
    color: "white",
    marginLeft: "5px",
  },
}

export default About
