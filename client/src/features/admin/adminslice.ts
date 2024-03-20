import  {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
type initialTypeState={
    loading:boolean;
    admin:string | null
    error:boolean
}
const initialState :initialTypeState={
    loading:false,
    admin:null,
    error:false
}

type adminFormType={
    email:string;
    password:string;
}

export const adminLogin = createAsyncThunk('admin/login', async (adminform:adminFormType) => {
    try {
      const response = await axios.post("http://localhost:3000/Server/admin/adminlogin",adminform, {
        method: 'post',
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


const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.pending,(state)=>{
            state.loading=true
        })

        builder.addCase(adminLogin.fulfilled,(state,action:PayloadAction<string>)=>{
            state.loading=false
            state.admin=action.payload
            state.error=false
        })

        builder.addCase(adminLogin.rejected,(state)=>{
            state.loading=false
            state.admin=null
            state.error=true
        })
   
        

    }
});


export default adminSlice.reducer