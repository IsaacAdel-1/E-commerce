



const FormInput = ({ label, type, name, value, onChange, placeholder, required, ExtraClasses , Options }) => {

    if (type == "select") {
        return (
            <>
                <div className={`formField ${ExtraClasses}`}>
                    <label htmlFor="Gender">{label}</label>
                    <select id={name} name={name} required value={value} onChange={onChange}>
                        {
                            Options.map((option)=>{
                                return(
                                    <option value={option}>{option}</option>
                                )
                            })
                        }
                        
                    </select>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={`${ExtraClasses} formField`}>
                <label htmlFor={name}>{label}</label>
                <input type={type} name={name} id={name} placeholder={placeholder} required={required} onChange={onChange} value={value} />
            </div>
        </>
    )
}

export default FormInput;