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
      <button class="btn btn-outline-success my-2 my-sm-0 disabled" type="submit">Search</button>
    </form>

    {/* <div>
            <Search
                value={Searchterms}
                onChange={onchangeSearch}
                placeholder="Search By Typing..."
            />
        </div> */}

        </div>

    );
};

export default Searchfeature;


