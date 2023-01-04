


import styles from './ButtonOutline.module.css'

const ButtonOutline = ({children}) => {

    return (      
      <button className={styles.btn} >
  <span className={styles.shadow}></span>
  <span className={styles.edge}></span>
  <span className={styles.front}> {children}
  </span>
</button>
    )
  }
  
  export default ButtonOutline