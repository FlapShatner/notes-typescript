import styles from './ButtonDelete.module.css'

const ButtonDelete = ({children, onClick}) => {

    return (      
      <button className={styles.btn} onClick={onClick}>
  <span className={styles.shadow}></span>
  <span className={styles.edge}></span>
  <span className={styles.front}> {children}
  </span>
</button>
    )
  }
  
  export default ButtonDelete