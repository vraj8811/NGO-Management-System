import React, { useState } from 'react'
import { Checkbox, Collapse, Dropdown,DropdownButton } from 'antd';

const { Panel } = Collapse

const Filter = (props) => {


    const [Checked, setChecked] = useState([])

        const category = [
        {
            "_id": "Human"
        },
        {
            "_id": "Animal",
        },
        {
            "_id": "Nature",
        },
        {
            "_id": "Birds",
        },
        {
            "_id": "Social Services",
        }
    ]

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }



    return (
        <div style={{display:'flex'}}>
            <label>Filter By Categories: </label>&nbsp;&nbsp;
            {/* <Collapse defaultActiveKey={['0']} > */}
            {/* <Panel header="category" key="1"> */}
            {category.map((value, index) => (
                <React.Fragment key={index}>
                    <Checkbox
                        onChange={() => handleToggle(value._id)}
                        type="checkbox"
                        checked={Checked.indexOf(value._id) === -1 ? false : true}
                    />&nbsp;&nbsp;
                    <span>{value._id}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </React.Fragment>
            ))}


            {/* </Panel> */}
            {/* </Collapse> */}
            
        </div>
    );
};

export default Filter;