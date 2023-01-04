import styles from './Button.module.css'



const Button = ({children}) => {

    return (      
      <button className={styles.btn}>
  <span className={styles.shadow}></span>
  <span className={styles.edge}></span>
  <span className={styles.front}> {children}
  </span>
</button>
    )
  }
  
  export default Button