import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../income/income.css';
import Navbar from '../navbar/navbar';
import Sidenav from '../navbar/Sidenav';
import EditTransaction from '../models/editTransaction';
import DeleteTransaction from '../models/deleteTransaction';
import CreatableSelect from 'react-select/creatable';

function Expenses(){
    //To rerender
    const [render, setRender] = useState(false);
    //To set range of report
    //----------------------
    const times = ["Yearly", "Monthly", "Weekly", "Daily" ];
    /**********************************************************************************************/
    //To set up fixed table
    //---------------------
    //title
    const [title, setTitle] = useState('');
    //description
    const [description, setDescription] = useState('');
    //currency
    const currencies=['$', 'LL'];
    const [currency, setCurrency] = useState(currencies[0]);
    //amount
    const [amount, setAmount] = useState('');
    //category
    //category creatable select
    const createOption = (label, id) => (
        {
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
        id
        }
    );
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/categories').then((response) => {
            setCategory(response.data.map((cat)=>{
                return (createOption(cat.category_name, cat.id))
            })
            );
            setNewCategory(response.data.map((cat)=>{
                return (createOption(cat.category_name, cat.id))
            })
            );
        })
    },[]);

    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const handleChange = (newValue) => {
        setSelected(newValue);
      };
    const handleCreate = async (inputValue) => {
        setIsLoading(true);
        console.group('Option created');
        console.log('Wait a moment...');
        setTimeout(async() => {
            // const newOption = createOption(inputValue);
            // console.log(newOption);
            console.groupEnd();
            setIsLoading(false);
            try{
                axios.post('http://localhost:8000/api/categories', {
                category_name: inputValue
                })
                .then((data) => {
                    if(data.status === 200){
                        console.log(200);
                        const newOption = createOption(inputValue, data.data.category.id);
                        setCategory([
                            ...category, newOption
                        ]);
                        setSelected(newOption);
                    }
                })
            }catch(err){
                console.log(err);
            }
        }, 1000);
    }
      //type
      const [type, setType] = useState('0');
      const [disable, setDisable]= useState(true);
      const handleTypeChange = (inType) => {
        setType(inType);
        setDisable(inType === '0');
        };
      //date
      const [startingDate, setStartingDate] = useState('');
      let [finishingDate, setFinishingDate] = useState('');
      //recurring frequency
      let [recurringFrequency, setRecurringFrequency] = useState('');
    /**********************************************************************************************/
    //Income
        //Erasing input when submitting
        const clickHandler = (e) => {
            e.preventDefault();
            setTitle('');
            setDescription('');
            setAmount('');
            setCurrency(currencies[0]);
            setType('0');
            setStartingDate('');
            setFinishingDate('');
            setRecurringFrequency('');
            setSelected('');
        }
    /***********************************************************************************************/
    //Getting Expenses data
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/expenses').then((response) => {
            setExpenses(response.data)
        })
    },[render]);
    /**********************************************************************************************/
    //Posting Expenses
    const postExpenses= async (e) => {
        e.preventDefault();
        console.log(type == '0');
        if(type == '0'){
            finishingDate= startingDate;
            recurringFrequency = 'NA';
        }
        try{
            // console.log(title, description, amount, selected.id, type, startingDate, finishingDate, recurringFrequency)
            axios.post('http://localhost:8000/api/expenses', {
                title: title,
                description: description,
                currency: currency,
                amount: amount,
                category_id: selected.id,
                fixed_recurring: type,
                starting_date: startingDate,
                finishing_date: finishingDate,
                recurring_frequency: recurringFrequency
            }).then((data) => {
                if(data.status === 200){
                    console.log(200);
                    clickHandler(e);
                    setRender(!render);
                    alert("Added");
                }
            })
        }catch(err){
            console.log(err);
        }
    }
    /***********************************************************************************************/
    //Editing Expenses
    //modal
    const handleEdit = async (e, id) => {
        e.preventDefault();
        try{
          axios.put(`http://localhost:8000/api/expenses/${id}`, {
            title: newTitle,
            description: newDescription, 
            currency: newCurrency,
            amount: newAmount,
            category_id: newSelected.id,
            fixed_recurring: newType,
            starting_date: newStartingDate,
            finishing_date: newFinishingDate,
            recurring_frequency: newRecurringFrequency   
          }).then((response) => {
              setRender(!render);
          })
        }catch(err){
          console.log(err);
        }
      }
    const [hide,setHide] = useState(true);
    //passing Id
    const [id,setId] = useState(null);
    //title
    const [newTitle, setNewTitle] = useState('');
    //description
    const [newDescription, setNewDescription] = useState('');
    //amount
    const [newAmount, setNewAmount] = useState('');
    //currency
    const [newCurrency, setNewCurrency] = useState(currencies[0]);
    //category
    const [newSelected, setNewSelected] = useState('');
    //type
    const [newType, setNewType] = useState('0');
    const [newDisable, setNewDisable]= useState(true);
    //date
    const [newStartingDate, setNewStartingDate] = useState('');
    let [newFinishingDate, setNewFinishingDate] = useState('');
    //recurring frequency
    let [newRecurringFrequency, setNewRecurringFrequency] = useState('');
/***********************************************************************************************/
    //Deleting Expenses
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try{
            axios.delete(`http://localhost:8000/api/expenses/${id}`)
            .then((response) => {
                setRender(!render);
            })
        }catch(err){
            console.log(err);
        }
    }
    const [show,setShow] = useState(false);
    /************************************************************************************************/
   
    return(
        <div className='income'>
            <Navbar/>
            <Sidenav />
            <div>
            <h1>Expenses</h1>
            <Link to="/home" className="income-report-button">Reports</Link>
            </div>
            <div className="income-table">
                <div className={hide ? `mod-edit hide-edit` : `mod-edit shown-edit`}>
                    <EditTransaction
                    setHide={setHide}
                    id={id}
                    currencies={currencies}
                    times={times}
                    isLoading={isLoading} setIsLoading={setIsLoading}
                    newSelected={newSelected} setNewSelected={setNewSelected}
                    newDisable={newDisable} setNewDisable={setNewDisable}
                    newTitle={newTitle} setNewTitle={setNewTitle}
                    newDescription={newDescription} setNewDescription={setNewDescription}
                    newAmount={newAmount} setNewAmount={setNewAmount}
                    newCurrency={newCurrency} setNewCurrency={setNewCurrency}
                    newCategory={newCategory} setNewCategory={setNewCategory}
                    newType={newType} setNewType={setNewType}
                    newStartingDate={newStartingDate} setNewStartingDate={setNewStartingDate}
                    newFinishingDate={newFinishingDate} setNewFinishingDate={setNewFinishingDate}
                    newRecurringFrequency={newRecurringFrequency} setNewRecurringFrequency={setNewRecurringFrequency}
                    render={render} setRender={setRender}
                    handleEdit={handleEdit}
                    />
                </div>
                <div className={ show ? `mod-edit shown-edit` : `mod-edit hide-edit`}>
                    <DeleteTransaction id={id} setRender={setRender} render = {render} newTitle={newTitle}
                    setShow={setShow}  handleDelete={handleDelete}
                    />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Currency</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Frequency</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <textarea id="title" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}></textarea>
                            </td>
                            <td>
                                <textarea id="description" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </td>
                            <td>
                                <select id="currency" name="currency" value={currency} onChange={(e)=>{setCurrency(e.target.value)}}>
                                {currencies.map((sign, index)  => 
                                        <option key={index} value={sign}>
                                            {sign}
                                        </option>
                                    )}</select>
                            </td>
                            <td>
                                <input type='number' id="amount" name="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}}></input>
                            </td>
                            <td>
                                <CreatableSelect
                                    className='income-select'
                                    isClearable
                                    isDisabled={isLoading}
                                    isLoading={isLoading}
                                    onChange={(e)=>{handleChange(e)}}
                                    onCreateOption={(e)=>{handleCreate(e)}}
                                    options={category}
                                    value={selected}
                                />
                            </td>
                            <td>
                                <div className="income-flex" value={type} onChange={(e) => {handleTypeChange(e.target.value)}}>
                                    <label className="income-width">
                                        <input type="radio" value="0" name="period"/>
                                        Fixed</label>
                                    <label className="income-width">
                                        <input type="radio" value="1" name="period"/>Recurring</label>
                                </div>
                            </td>
                            <td>
                                <div className="income-flex">
                                    <label>
                                        Starting <input type='date' id="starting-date" name="starting-date" value={startingDate} onChange={(e)=>{setStartingDate(e.target.value)}}/>
                                    </label>
                                    <label>
                                        Finishing <input
                                        type='date'
                                        id="finishing-date"
                                        name="finishing-date"
                                        disabled={disable}
                                        value={finishingDate}
                                        onChange={(e)=>{setFinishingDate(e.target.value)}}/>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <select
                                id="recurring-frequency"
                                name="recurring-frequency"
                                disabled={disable}
                                value={recurringFrequency}
                                onChange={(e)=>{setRecurringFrequency(e.target.value)}}>
                                    {times.map((time, index)  => 
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                )}</select>
                            </td>
                            <td>
                                <button className="income-items income-button"onClick={postExpenses}>Add</button>
                            </td>
                        </tr>
                        {expenses.map((expense,index)=>
                        <tr key={index} className={`income-table-${index%2===0 ? 'even' : 'odd'}`}>
                            <td className="income-max">{expense.title}</td>
                            <td className="income-max">{expense.description}</td>
                            <td>$</td>
                            <td>{expense.amount}</td>
                            <td className="income-max">{category.filter((cat)=>{return cat.id===expense.category_id})[0].label}</td>
                            <td>{expense.fixed_recurring==0 ? 'Fixed' : 'Recurring'}</td>
                            <td>{expense.starting_date}</td>
                            <td>{expense.recurring_frequency}</td>
                            <td>
                                <button className="income-items income-button"
                                onClick={()=>{
                                    setHide(false);
                                    setId(expense.id);
                                    setNewTitle(expense.title);
                                    setNewDescription(expense.description);
                                    setNewCurrency(expense.currency)
                                    setNewAmount(expense.amount)
                                    setNewSelected(()=>{return category.filter((cat)=>{return cat.id===expense.category_id})[0]});
                                    setNewType(expense.fixed_recurring);
                                    setNewDisable(expense.fixed_recurring==0)
                                    setNewStartingDate(expense.starting_date);
                                    setNewFinishingDate(expense.finishing_date);
                                    setNewRecurringFrequency(expense.recurring_frequency);
                                }}
                                ><i className="fa fa-edit"></i> Edit</button>
                                <button className="income-items income-button"
                                onClick={()=>{
                                    setShow(true);
                                    setId(expense.id);
                                    setNewTitle(expense.title);
                                }}
                                ><i className="fa">&#xf014;</i> Delete</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Expenses;