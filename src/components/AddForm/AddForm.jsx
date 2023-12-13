import react, { useState } from 'react';
import axios from 'axios';

function AddForm(props){
    const [newItemName, setNewItemName] = useState("")
    const [newItemURL, setNewItemURL] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault();
        let newItem = {
            description: newItemName,
            image_url: newItemURL
        }
        console.log(newItem);
        axios.post('/api/shelf',newItem)
            .then((response) => {
                console.log("Item added", newItem);
            })
            .catch((error) => {
                console.error("Error in POST to '/api/shelf", error);
                alert("Add item unsuccessful. See console");
            })
        ;
        setNewItemName("");
        setNewItemURL("");
        props.fetchShelf();
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2 style={{marginLeft:"5px"}}>Add to the shelf:</h2>
            <input 
                type="text" 
                placeholder="Item name"
                id="name-input" 
                value={newItemName} 
                onChange={(e)=>setNewItemName(e.target.value)}
            />
            <br/>
            <input 
                type="text"
                id="url-input" 
                placeholder="Item pic URL"
                style={{width:"500px"}} 
                value={newItemURL} 
                onChange={(e)=>setNewItemURL(e.target.value)}
            />
            <br/>
            <button style={{marginLeft:"5px"}}>Submit</button>
            <hr/>
            <br/>
        </form>
    )
}

export default AddForm;