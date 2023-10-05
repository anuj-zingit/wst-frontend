const INITIAL_STATE = true;

let formdataReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'FORM_DATA') {
        return action.data
    } 
    else if (action.type === 'CLEAR_FORM_DATA') {
        console.log(state.formData.uploadLogoOne,"firstLogo")
        // const data=[]
        // if(state.formData.uploadLogoOne)
        // { state.formData.uploadLogoOne=data
        //     console.log('check')
            
            
        // }       
        return state.formData.uploadLogoOne;
    }

    else {
        return state;
    }
};

export default formdataReducer;

