import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';
import AddForm from '../AddForm/AddForm';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);

  useEffect(() => {
    fetchShelf();
  }, []);

  const handleClick = (id) => {
    axios.delete(`/api/shelf/${id}`)
      .then((response) => {
        console.log(`ID: ${id} deleted.`);
      })
      .catch((error) => {
        console.error("Error in DELETE at '/api/shelf/:id", error);
        alert("Delete unsucessful. See console.");
      })
    ;
    fetchShelf();
  }

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  return (
    <div className="container">
      <AddForm fetchShelf={fetchShelf}/>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button onClick={()=>handleClick(item.id)} style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
