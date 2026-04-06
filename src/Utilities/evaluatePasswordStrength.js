
    export const evaluatePasswordStrength = (password) => {
        // const password = formData.password ;
        const length = password.length;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        
        if (password === "") {
            return ""; 
            
        }

        if (length >= 12 && (hasNumber || hasLetter)) {
                              
            return 'Strong' ;
            
        }

        if (length > 8 && hasNumber && hasLetter) {
           
            return 'Strong' ;
        }

        if (length > 8 && ((hasNumber && !hasLetter) || (hasLetter && !hasNumber))) {
            
            return 'Medium';
        }
        if (length > 5 && hasNumber && hasLetter) {
            
            return 'Weak';
        }

        if (length > 5 && ((hasNumber && !hasLetter) || (hasLetter && !hasNumber))) {
             
            return 'Very Weak';
        }


        if (length <= 5 && ((hasNumber && !hasLetter) || (hasLetter && !hasNumber))) {
             
            return 'Extremely Weak';
        }
        return 0; 
    };