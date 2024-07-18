import { useEffect, useState } from 'react';
import './index.css'
import axios from 'axios';
import Loading from '../loading';
import { API_BASE_URL } from '../../configs/config';


const Content = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [errInput, setErrInput] = useState('');


    // Content
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`${API_BASE_URL}/data/task`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }

    const handleUpdate = async (value, id) => {
        await axios.put(`${API_BASE_URL}/data/task/${id}`, {done: value}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const handleDelete = async (value, id) => {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/data/task/${id}`);
        getData();
        setLoading(false);
    }


    // Add 
    const handlePost = async (event) => {
        event.preventDefault();
        try {
            setErrInput('')
            if(input === '') {
                throw new Error('Input tidak boleh kosong')
            }else if(input.length > 30){
                throw new Error('Input tidak boleh lebih dari 30 huruf')
            } else {
                setLoading(true);
                await axios.post(`${API_BASE_URL}/data/task`, {
                    name: input,
                    done: false
                });
                setInput('')
                getData();
                setLoading(false);
            }
        } catch (e) {
            setErrInput(e.message);
        }
    }
    

    return(
        <div>
            {!data ? <Loading/> : (
                <>
                    <div className="main-container">
                        <p className='main-title'>Tasks</p>
                        <div className="content-container">
                            { data.map(item => (
                                <div className="content-box" key={item._id}>
                                    <input type="checkbox" defaultChecked={item.done} onChange={ e => handleUpdate(e.target.checked, item._id)}/>
                                    <p className="title"> {item.name} </p>
                                    <button className={loading ? 'disabled' : 'delete' } onClick={e => handleDelete(e, item._id)}>X</button>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className="add-container">
                        <p className='main-title'>New Task</p>
                        <form onSubmit={handlePost} className="add-box">
                            <input className='add-input' value={input} type="text" onChange={e => setInput(e.target.value)}/>
                            { errInput ? <p className='error'> {errInput} </p> : null}
                            <button className={loading ? 'add-button-disabled'  : 'add-button' } type='submit'>{loading ? 'Loading' : 'ADD' }</button>
                        </form>
                    </div>
                </>
            )}
        </div>
        
    )
}

export default Content;