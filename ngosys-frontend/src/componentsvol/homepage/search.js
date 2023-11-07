import React, { useState } from "react";
import { Input } from "antd";




//serach function



const Searchfeature = (props) => {

const {Search} = Input;
const [Searchterms, setSearch] = useState("");  

    const onchangeSearch = (event) =>{
            setSearch(event.currentTarget.value)

            props.refreshFunction(event.currentTarget.value)
    }

return (
        <div>
            <Search 
            value={Searchterms} 
            onChange={onchangeSearch} 
            placeholder="Seach by city.." 
            style={{ display: 'flex', justifyContent: 'flex-end', marginRight:'20px'}}/>
        </div>
    );
};

export default Searchfeature;