import { createSlice } from "@reduxjs/toolkit";
const questionsSlice = createSlice({
    name : "questions",
    initialState : {
        createQuestions : {
            isfetching : false,
            error : false,
            success : false
        },
        fetchQuestions : {
            isfetching : false,
            error : false,
            success : false,
            questions : null
        }
    },
    reducers : {
        fetchQuestionsStart : (state) =>{
            state.fetchQuestions.isfetching = true
        },
        fetchQuestionsSuccess : (state, action) =>{
            state.fetchQuestions.isfetching = false
            state.fetchQuestions.success = true
            state.fetchQuestions.questions = action.payload
        },
        fetchQuestionsFailure : (state) =>{
            state.fetchQuestions.isfetching = false
            state.fetchQuestions.error = true
        },
    }
});

export const {
    fetchQuestionsStart,
    fetchQuestionsSuccess,
    fetchQuestionsFailure
} = questionsSlice.actions;

export default questionsSlice.reducer;