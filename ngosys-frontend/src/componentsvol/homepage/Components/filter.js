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
            <label style={{fontWeight: 'bold'}}>Categories To Filter: </label>
            {category.map((value, index) => (
                <React.Fragment key={index}>
                    <Checkbox
                        onChange={() => handleToggle(value._id)}
                        type="checkbox"
                        checked={Checked.indexOf(value._id) === -1 ? false : true}
                        style={{marginRight: '1%'}}
                    />
                    <span style={{marginRight: '7%'}}>{value._id}</span>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Filter;