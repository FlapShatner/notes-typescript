import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { BiUser, BiCog, BiLogOut } from "react-icons/bi";
import styles from "./Profile.module.css";

const Profile = () => {
  const { data: session } = useSession();
  const avatar = session?.user.image;
  const avatarRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  const toggleMenu = () => {
    if(!isMenuOpen){
    clickRef.current?.classList.toggle(styles.active)
    }
    setIsMenuOpen(!isMenuOpen);
  }

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickRef.current  && !clickRef.current.contains(event.target as Node)) {
        clickRef.current.classList.remove(styles.active);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);


 

  const letter = session?.user.email[0].toUpperCase();

  return (
    <div>
      <div  onClick={() => toggleMenu()} className={styles.wrapper}>
        <div ref={avatarRef}>
          {avatar ? (
            <img src={avatar} alt="user avatar" />
          ) : (
            <p className={styles.letter}>{letter}</p>
          )}
        </div>
      </div>
      <div ref={clickRef}  className={styles.menu}>
      <ul>
        <li >
          <BiUser />
          Profile
        </li>
        <li>
          <BiCog />
          Settings
        </li>
        <li onClick={() => signOut()}>
          <BiLogOut />
          Logout
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Profile;
