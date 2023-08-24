import { Modal } from 'antd';
import React, { useState } from 'react'
import { useEffect } from 'react';
const PopUp_1 = ({message, onClose }) => {
const [openhai, setopenhai] =useState(true)
const closeModal = ()=>{
    setopenhai(!openhai)
    onClose(false)
}
  return (
   <>
    <Modal open={openhai} onOk={closeModal} onCancel={closeModal}>
      <p>{message}</p>
    </Modal>
   </>
  )
}

export default PopUp_1
