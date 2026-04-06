
import './Address.css';
import { useEffect, useState } from 'react';
import {Set_Address , Get_Address} from '../../../Services/constants'


export const AddressForm = ({display , close}) => {
    
    if(!display)return null ;

    const [AddressData , setAddressData] = useState({
   
            fullName: "",
            phone: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            postal: "",
            country: "",
            notes: "",
            defaultAddress: false
  
    })
    const handleData = (e) => {
        const { name, type, value, checked } = e.target;
        setAddressData({
          ...AddressData,
          [name]: type === "checkbox" ? checked : value
        });
      };
      
    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
        const response = await fetch(Set_Address ,
          {  method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(AddressData)
          }
        )
        const data = await response.json();
        console.log(data)
    }
        catch(err){
            
        }
    }

 
    return (
        <>
        <div className={`AddressFormContainer ${display ? "block" :"hidden"}`} onClick={()=>{close();}} >
            <form className="address-card" id="addressForm"  autoComplete="on" onClick={(e)=>{e.stopPropagation()}}
                 onSubmit={handleSubmit} >
                <h2>Address Information </h2>
                <h4>Please enter your complete address details</h4>
                <div className="form-grid">
                    <div className="form-group fullName">
                        <label htmlFor="fullName">Full name  </label>
                        <input id="fullName" name="fullName" type="text" placeholder="John Doe" required  onChange={handleData}/>
                    </div>

                    <div className="form-group phoneNumber">
                        <label htmlFor="phone">Phone number  </label>
                        <input id="phone" name="phone" type="tel" placeholder="+1 555 555 555" required  onChange={handleData}/>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="address1">Address line 1  </label>
                        <input id="address1" name="address1" type="text" placeholder="Street address, P.O. box, company name" required  onChange={handleData}/>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="address2">Address line 2</label>
                        <input id="address2" name="address2" type="text" placeholder="Apartment, suite, unit (optional)" onChange={handleData} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City  </label>
                        <input id="city" name="city" type="text" placeholder="Cairo" required onChange={handleData}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State / Province / Region</label>
                        <input id="state" name="state" type="text" placeholder="Giza" onChange={handleData}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal">ZIP / Postal code  </label>
                        <input id="postal" name="postal" type="text" placeholder="12345" required onChange={handleData}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country  </label>
                        <select id="country" name="country" required onChange={handleData}>
                            <option value="">Select country</option>
                            <option>Egypt</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Saudi Arabia</option>
                            <option>United Arab Emirates</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="notes">Delivery notes</label>
                        <textarea id="notes" name="notes" placeholder="Leave gate code, delivery instructions, etc. (optional)" onChange={handleData}/>
                    </div>
                </div>

                <div className="actions">
                    <div>
                        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <input type="checkbox" name="defaultAddress" onChange={handleData}/> Set as default address
                        </label>
                    </div>

                    <div>
                        <button type="reset" className="btn secondary">Reset</button>
                        <button className="btn" >Save Address</button>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}
const Address = () => {

    
    const [displayForm , setDisplayForm] = useState(false);
    const open = () => setDisplayForm(true);
    const close = () => setDisplayForm(false);
    const [Addresses , setAddresses] = useState([]);
    const[error , setError] = useState("");
    const fetchAddresses = async () => {
        try{
            const response = await fetch(Get_Address ,
            {   method : 'GET',
                headers : {
                'Content-Type' : 'application/json'
                }
            }
            )
            const data = await response.json();
            
            if(Array.isArray(data)){
                setAddresses(data);
                console.log(data)
            }
            else{
                setAddresses([]);
                setError(data.error);
            }
        }
        catch(err){
           console.error(err.message) 
           setAddresses([]);
        }
    }  

    useEffect(()=>{
        fetchAddresses();
    }, [])
    return (

        <>
        <AddressForm display={displayForm} close = {close}/>
            <div className="AddressContainer">
                <header>
                    <h3>My Addresses</h3>
                    <button className="+Address"
                    onClick={()=>{open();}}
                    >+ Add New Address</button>
                </header>


                <div className="AdressesDetails">
                  {
                   Array.isArray(Addresses) ? Addresses.map((address) => (
                        <Card className="shadow-sm border-primary mb-3" style={{ maxWidth: '400px' }}>
                        <Card.Header className="bg-primary text-white">
                          <Row>
                            <Col>{address.fullName}</Col>
                            <Col className="text-end">
                              <Button variant="light" size="sm">Edit</Button>
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <div><strong>Phone:</strong> {address.phone}</div>
                            {/* <div><strong>Email:</strong> {address.email}</div> */}
                            <hr />
                            
                            <div>{address.city}, {address.state}</div>
                            <div>{address.postalCode}, {address.country}</div>
                          </Card.Text>
                          <Button variant="outline-primary" className="mt-2 w-100">
                            Set as Default
                          </Button>
                        </Card.Body>
                      </Card>
                    )) : <h2>{error}</h2> 
                  }
                </div>
            </div>
        </>
    )
}
export default Address ; 