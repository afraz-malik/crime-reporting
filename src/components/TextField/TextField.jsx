import React from 'react'

import styles from './TextField.module.scss'

const TextField = ({ error, inline, label, textarea, ...props }) => {
 return (
  <div className={`${styles.row} w-full ${error ? styles.error : ''} `}>
   {label && <label>{label}</label>}
   {textarea ? (
    <textarea
     {...props}
     // type="text"
     className={`border-border-color-removing-so-that w-full rounded-md ${
      !inline && 'border'
     } p-3 font-normal ${props.className}`}
    />
   ) : (
    <input
     {...props}
     // type="text"
     className={`border-border-color-removing-so-that w-full rounded-md ${
      !inline && 'border'
     } p-3 font-normal ${props.className}`}
    />
   )}

   <span className={styles.errorMessage}>{error}</span>
  </div>
 )
}

export default TextField
