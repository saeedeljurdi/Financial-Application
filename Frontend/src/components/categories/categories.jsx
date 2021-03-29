import React, {useState, useEffect} from 'react';
import './categories.css'
import Navbar from '../navbar/navbar'
import Sidenav from '../navbar/Sidenav';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
function Categories(){
    const [render, setRender] = useState(false);
    const [toggleForm, setToggleForm] = useState([]);
    const [opacity, setOpacity] = useState(true);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [catData, setCatData] = useState([]);
    useEffect(() => {
        setToggleForm([]);
        axios.get('http://localhost:8000/api/categories').then((response) => {
            setCatData(response.data)
            response.data.map((cat)=>{
                setToggleForm(prev=>[
                    ...prev,{
                            id: cat.id,
                            edit: false,
                            delete: false
                        }
                ])
        })
    })
    },[render]);
    const handleToggleEdit =(id)=>{
        setToggleForm(prev=>{
            return prev.map((tog)=>{
                if(tog.id == id){
                    return{
                        id: id,
                        edit: !tog.edit,
                        delete: false
                    }
                }else{
                    return tog;
                }
            });
        })
    }
    const handleToggleDelete =(id)=>{
        setToggleForm(prev=>{
            return prev.map((tog)=>{
                if(tog.id == id){
                    return{
                        id: id,
                        edit: false,
                        delete: !tog.delete
                    }
                }else{
                    return tog;
                }
            });
        })
    }
    const handleEdit = async (e, id) => {
        e.preventDefault();
        try{
          axios.put(`http://localhost:8000/api/categories/${id}`, {
            category_name: newCategory
          }).then((response) => {
              console.log('updated');
              setRender(!render);
          })
        }catch(err){
          console.log(err);
        }
      }
      const handleDelete = async (e, id) => {
        e.preventDefault();
        try{
            axios.delete(`http://localhost:8000/api/categories/${id}`)
            .then((response) => {
                console.log('deleted');
                setRender(!render);
            })
        }catch(err){
            console.log(err);
        }
    }
    const handleCreate= async (e) => {
        e.preventDefault();
        try{
            axios.post('http://localhost:8000/api/categories', {
                category_name: category
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    setCatData([
                        ...catData, {
                            category_name: category
                        }
                    ]);
                    setRender(!render);
                    alert("Added");
                }
            })
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className='categories'>
            <Navbar/>
            <Sidenav />
            <h1>Categories</h1>
            <div className='categories-container'>
                <CardDeck>
                <Card className={`categories-card${opacity ? '-opacity' : ''}`}>
                    <Card.Header className={'card-header-odd'}>{category}</Card.Header>
                    <Card.Body>
                    <div className="categories-arguments">
                        <textarea
                        id="category"
                        name="category" 
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value); setOpacity(false);}}
                        >
                        </textarea>
                        <button
                            type="submit"
                            className="categories-button-white"
                            onClick={(e) => {
                                e.preventDefault();
                                handleCreate(e);
                                setCategory('');
                                setOpacity(true);
                                }}
                            >
                            Confirm
                        </button>
                        </div>
                        <button
                            className='categories-add'
                            onClick={(e) => {
                                e.preventDefault();
                                setOpacity(!opacity);
                                setRender(!render);
                                }}
                            >
                            +
                        </button>
                        </Card.Body>
                    </Card> 
                    {catData.map((cat,index)=>{
                        return(
                        <Card key={index}>
                        <Card.Header className={`card-header-${index%2===0 ? 'even' : 'odd'}`}>{cat.category_name}</Card.Header>
                        <Card.Body>
                        <div className="categories-arguments">{
                            toggleForm.map((tog)=>{
                                return (
                                    <>
                                    {tog.id == cat.id && tog.edit && <>
                                        <textarea
                                        id="category"
                                        name="category" 
                                        value={newCategory}
                                        onChange={(e)=>{
                                            setOpacity(true);setNewCategory(e.target.value)}}
                                        >
                                        </textarea>
                                        <button
                                            type="submit"
                                            className="categories-button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleEdit(e,cat.id);
                                                setOpacity(true);
                                                setNewCategory('');
                                                setToggleForm(prev=>{
                                                    return prev.map((tog)=>{
                                                        return{
                                                            id: tog.id,
                                                            edit: false,
                                                            delete: false
                                                        }
                                                    });
                                                })
                                                }}
                                            >
                                            Confirm
                                        </button>
                                        </>}
                                    {tog.id == cat.id && tog.delete && <>
                                        Are you sure?
                                        <button
                                            type="submit"
                                            className="categories-button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(e,cat.id);
                                                setOpacity(true);
                                                setToggleForm(prev=>{
                                                    return prev.map((tog)=>{
                                                        return{
                                                            id: tog.id,
                                                            edit: false,
                                                            delete: false
                                                        }
                                                    });
                                                })
                                                }}
                                        >Yes
                                        </button>
                                        <button
                                            type="submit"
                                            className="categories-button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpacity(true);
                                                setToggleForm(prev=>{
                                                    return prev.map((tog)=>{
                                                        return{
                                                            id: tog.id,
                                                            edit: false,
                                                            delete: false
                                                        }
                                                    });
                                                })
                                                }}
                                            >No
                                        </button>
                                        </>}
                                    </>
                                )
                            })}</div>
                            <div className="categories-buttons">
                                <button
                                    type="submit"
                                    className="categories-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpacity(true);
                                        handleToggleEdit(cat.id);
                                        }}
                                    >
                                    <i className="fa fa-edit"></i> EDIT
                                </button>
                                <button className="categories-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpacity(true);
                                        handleToggleDelete(cat.id);
                                        }}
                                    ><i className="fa">&#xf014;</i> DELETE</button>
                            </div>
                        </Card.Body>
                        </Card>
                        )
                    })}
                </CardDeck>
            </div>
        </div>
    )
}
export default Categories;