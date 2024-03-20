import AdminNav from '../../Components/AdminNav';
import AdminView from '../../Components/AdminView'
import React from 'react'

const AdminTable = () => {
  return (
   <>
   <AdminNav/>
   <div className='max-w-lg mx-auto mt-20 text-center'>
     <AdminView/>
    </div>
  
   </>
  )
}

export default AdminTable
