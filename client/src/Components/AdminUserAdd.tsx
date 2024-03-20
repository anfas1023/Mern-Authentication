import React from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios'
type formtype={
  username:string;
  email:string;
  password:string
}

type props={

  setModal:React.Dispatch<React.SetStateAction<boolean>>
}

const AdminUserAdd = ({setModal}:props) => {
    const [openModal, setOpenModal] = useState(false);
    const [form, setForm] = useState<formtype>({
      username:'',
      email:'',
      password:''
    });
    const [error,setError]=useState<boolean>(false);
    const [errorMessage,setErrorMessage]=useState<string>('')
    function onCloseModal() {
        setOpenModal(false);
      }

      const handleFormSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()

  await axios.post('http://localhost:3000/Server/admin/createuser',form).then(()=>{
  setError(false)
  setErrorMessage('')
  setOpenModal(false)
 }).catch((error : any)=>{
  setError(true)
  setErrorMessage(error.response.data.errorMessage)
 })

//  if(response.data.errorMessage){

//  }else{
  

//  }

}
   
   return (
<>
    <Button onClick={() => setOpenModal(true)}>Add User</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handleFormSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add A new User Here</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="UserName"
                placeholder="Enter Your UserName"
                onChange={(event) => setForm({...form,username:event.target.value})}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your password" />
              </div>
              <TextInput  onChange={(event) => setForm({...form,email:event.target.value})} placeholder='Enter You Email' id="email" type="email" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput  onChange={(event) => setForm({...form,password:event.target.value})} placeholder='Enter You Password' id="password" type="password" required />
            </div>
            <div className="w-full">
            <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90">
      Add User
        </button>
            </div>
            {error && <p className='text-red-700 text-center'>{errorMessage}</p> }
            </form>
          </div>
        </Modal.Body>
      </Modal>
   </>
  
   )
}

export default AdminUserAdd
