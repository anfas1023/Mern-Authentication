import  {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'

type userstype={
    _id:string,
    username:string,
    email:string,
    createdAt:string,
    updatedAt:string,
    image:File | null
 }
type initialType ={
    loading:boolean,
    users:userstype | null,
    error:any
}

interface updateType{
  username:string,
  email:string,
  password:string,
  id:string
}


const initialState :initialType={
    loading:false,
    users:null,
    error:''
}

type FormType = {
  email: string;
  password: string;
};

type signUpType = {
  username: string;
  email: string;
  password: string;
};

export const signUpUser = createAsyncThunk('users/signUpUser', async (form:signUpType) => {
  try {
    const response = await axios.post("http://localhost:3000/Server/auth/signup",form,{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      withCredentials: true
    });
    return response.data; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
});

export const signInUser = createAsyncThunk('users/signInUser', async (form:FormType) => {
  try {
    const response = await axios.post("http://localhost:3000/Server/auth/signin",form,{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      withCredentials: true
    });
    return response.data; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
});

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
    try {
      const response = await axios.get("http://localhost:3000/Server/auth/getLoggedInUserData", {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
    
      return response.data; 
    } catch (error) {
      throw error; 
    }
  });

  export const Updateuser = createAsyncThunk('users/update', async ({username,email,password,id}:updateType) => {
    try {
      const userData = {
        username,
        email,
       password,
      };
      console.log("userdat",userData);
        const response = await axios.post(`http://localhost:3000/Server/user/updateuser/${id}`,userData ,{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
          },

        withCredentials: true,
        
      });
      console.log("res",response.data); 
      return response.data; 
    } catch (error) {
      console.log(error);
      throw error; 
    }
  });

  
  export const deleteUser = createAsyncThunk('users/Delete', async (id:string) => {
    try {
        const response = await axios.delete(`http://localhost:3000/Server/user/delete/${id}`,{
        method: 'Delete',
        headers:{
            'content-type': 'application/json'
          },
        withCredentials: true,
        
      });
      console.log("res",response.data);   
      return response.data; 
    } catch (error) {  
      console.log(error);
      throw error; 
    }
  });


  export const LogOutUser = createAsyncThunk('users/logOut', async () => {
    try {
      const response = await axios.get("http://localhost:3000/Server/auth//logout", {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
    
      return response.data; 
    } catch (error) {
      throw error; 
    }
  });

const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers :(builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading=true
        })

        builder.addCase(fetchUser.fulfilled,(state,action:PayloadAction<userstype>)=>{
            state.loading=false
            state.users=action.payload
            state.error=''
        })

        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false
            state.users=null
        })

       builder.addCase(deleteUser.pending,(state)=>{
          state.loading=true
      })

      builder.addCase(deleteUser.fulfilled,(state,action:PayloadAction<userstype>)=>{
          state.loading=false
          state.users=null
          state.error=''
      })

      builder.addCase(deleteUser.rejected,(state)=>{
          state.loading=false
          state.users=null
          state.error='Some thing went Wrong'
      })

      builder.addCase(signInUser.pending,(state)=>{
        state.loading=true
      })

      builder.addCase(signInUser.fulfilled,(state,action:PayloadAction<userstype>)=>{
      state.loading=false
      state.users=action.payload
      state.error=false
      })

      builder.addCase(signInUser.rejected,(state)=>{
        state.loading=false
        state.users=null
        state.error='Sign In Failed'
        })

        builder.addCase(signUpUser.pending,(state)=>{
          state.loading=true
        })
  
        builder.addCase(signUpUser.fulfilled,(state,action:PayloadAction<userstype>)=>{
        state.loading=false
        state.users=action.payload
        state.error=false
        })
  
        builder.addCase(signUpUser.rejected,(state)=>{
          state.loading=false
          state.users=null
          state.error='Sign In Failed'
          })

          builder.addCase(LogOutUser.pending,(state)=>{
            state.loading=true
          })
    
          builder.addCase(LogOutUser.fulfilled,(state)=>{
          state.loading=false
          state.users=null
          state.error=false
          })
    
          builder.addCase(LogOutUser.rejected,(state)=>{
            state.loading=false
            state.users=null
            state.error='Logout Failed'
            })
    }
})

export default userSlice.reducer


