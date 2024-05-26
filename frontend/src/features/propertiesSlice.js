import { createSlice } from "@reduxjs/toolkit";

const initialState={
    properties:JSON.parse(sessionStorage.getItem("properties")) || []
};

export const propertiesSlice=createSlice({
    name:'properties',
    initialState,
    reducers:{
        addPropertyArray:(state,action)=>{
            sessionStorage.setItem("properties",JSON.stringify(action.payload));
            state.properties=action.payload;
        },
        addProperty:(state,action)=>{
            let propertiesArray=state.properties;
            state.properties=[propertiesArray,action.payload];
            propertiesArray=[...propertiesArray,action.payload];
            sessionStorage.setItem("properties",JSON.stringify(propertiesArray));
        },
        removeProperty:(state,action)=>{
            state.properties = state.properties.filter(property => property._id !== action.payload);
            sessionStorage.setItem("properties", JSON.stringify(state.properties));
        },
        clearProperties:(state)=>{
            sessionStorage.removeItem("properties");
            state.properties=[];
        }
    }
})

export const {addPropertyArray,addProperty,removeProperty,clearProperties}=propertiesSlice.actions;

export default propertiesSlice.reducer;