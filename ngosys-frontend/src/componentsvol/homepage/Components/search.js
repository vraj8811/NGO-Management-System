import React, { useState } from "react";
import { Input} from "antd";




//serach function



const Searchfeature = (props) => {

    const { Search } = Input;
    const [Searchterms, setSearch] = useState("");

    const onchangeSearch = (event) => {
        setSearch(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)
    }



    return (
        <div>         
        <form class="form-inline my-2 my-lg-0" style={{ display: 'flex', justifyContent: 'center', marginRight: '20px' }}>
            <input class="form-control mr-sm-2" 
                    type="search" placeholder="Search" 
                    aria-label="Search" 
                    style={{width:'500px'}} 
                    value={Searchterms}
                    onChange={onchangeSearch}
            />
        </form>
        </div>

    );
};

export default Searchfeature;


