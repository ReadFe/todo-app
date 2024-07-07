import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';
import Loading from '../loading';

const Content = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);


    // Content
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('http://localhost:3000/data')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }

    const statusChange = (value, id) => {
        axios.put(`http://localhost:3000/data/put/${id}`, {done: value}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const handleDelete = (value, id) => {
        axios.delete(`http://localhost:3000/data/delete/${id}`);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
          }, 500);
        getData();
    }


    // Add 
    const handlePost = () => {
        axios.post(`http://localhost:3000/data/post`, {
            name: input,
            done: false
        });
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
          }, 500);
        getData();
    }
    

    return(
        <div>
            {loading ? <Loading/> : (
                <>
                    <div className="main-container">
                        <p className='main-title'>Tasks</p>
                        <div className="content-container">
                            { data.map(item => (
                                <div className="content-box" key={item._id}>
                                    <input type="checkbox" defaultChecked={item.done} onChange={ e => statusChange(e.target.checked, item._id)}/>
                                    <p className="title"> {item.name} </p>
                                    <button className='delete' onClick={e => handleDelete(e, item._id)}>X</button>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className="add-container">
                        <p className='main-title'>New Task</p>
                        <div className="add-box">
                            <input className='add-input' type="text" onChange={e => setInput(e.target.value)}/>
                            <button className='add-button' onClick={handlePost}>ADD</button>
                        </div>
                    </div>
                </>
            )}
        </div>
        
    )
}

export default Content;