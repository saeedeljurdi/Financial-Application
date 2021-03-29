import React from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const EditTransaction = (props) => {

  //category
  const handleEditChange = (newValue) => {
    props.setNewSelected(newValue);
  };
  const createOption = (label, id) => (
    {
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
    id
    }
);
  const handleEditCreate = async (inputValue) => {
    props.setIsLoading(true);
    console.group('Option created');
    console.log('Wait a moment...');
    setTimeout(async() => {
        console.groupEnd();
        props.setIsLoading(false);
        try{
            axios.post('http://localhost:8000/api/categories', {
            category_name: inputValue
            })
            .then((data) => {
                if(data.status === 200){
                    console.log(200);
                    const newOption = createOption(inputValue, data.data.category.id);
                    props.setNewCategory([
                        ...props.newCategory, newOption
                    ]);
                    props.setNewSelected(newOption);
                }
            })
        }catch(err){
            console.log(err);
        }
    }, 1000);
  };
  //type
  const handleEditTypeChange = (inType) => {
    props.setNewType(inType);
    props.setNewDisable(inType === '0');
  };
  return ( 
    <div className="income-table">
      <table className='income-edit-table'>
        <tbody>
          <tr>
            <th colSpan='7'></th>
            <th>
              <button className="income-close-button" onClick={()=>props.setHide(true)}>
              X
              </button>
            </th>
          </tr>
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
              <textarea id="newTitle" name="newTitle" value={props.newTitle} onChange={(e)=>{props.setNewTitle(e.target.value)}}></textarea>
            </td>
            <td>
              <textarea id="newDescription" name="newDescription" value={props.newDescription} onChange={(e)=>{props.setNewDescription(e.target.value)}}></textarea>
            </td>
            <td>
              <select id="newCurrency" name="newCurrency" value={props.newCurrency} onChange={(e)=>{props.setNewCurrency(e.target.value)}}>
                {props.currencies.map((sign, index)  => 
                  <option key={index} value={sign}>
                      {sign}
                  </option>
                )}
              </select>
            </td>
            <td>
              <input type='number' id="newAmount" name="newAmount" value={props.newAmount} onChange={(e)=>{props.setNewAmount(e.target.value)}}></input>
            </td>
            <td>
              <CreatableSelect
                className='income-select'
                isClearable
                isDisabled={props.isLoading}
                isLoading={props.isLoading}
                onChange={(e)=>{handleEditChange(e)}}
                onCreateOption={(e)=>{handleEditCreate(e)}}
                options={props.newCategory}
                value={props.newSelected}
              />
            </td>
            <td>
              <div className="income-flex" value={props.newType} onChange={(e) => {handleEditTypeChange(e.target.value)}}>
                <label className="income-width">
                  <input type="radio" value="0" checked={props.newType===0} name="newPeriod"/>Fixed</label>
                <label className="income-width">
                    <input type="radio" value="1" checked={props.newType===1} name="newPeriod"/>Recurring</label>
              </div>
            </td>
            <td>
              <div className="income-flex">
                <label>
                  Date <input type='date' id="new-starting-date" name="new-starting-date" value={props.newStartingDate} onChange={(e)=>{props.setNewStartingDate(e.target.value)}}/>
                </label>
                {/* <label>
                  Finishing Date<input
                  type='date'
                  id="finishing-date"
                  name="finishing-date"
                  disabled={props.newDisable}
                  value={props.newFinishingDate}
                  onChange={(e)=>{props.setNewFinishingDate(e.target.value)}}/>
                </label> */}
              </div>
            </td>
            <td>
              <select
                id="new-recurring-frequency"
                name="new-recurring-frequency"
                disabled={props.newDisable}
                value={props.newRecurringFrequency}
                onChange={(e)=>{props.setNewRecurringFrequency(e.target.value)}}>
                {props.times.map((time, index)  => 
                  <option key={index} value={time}>
                      {time}
                  </option>
                )}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      
      <button
        type="submit"
        className="income-items income-edit-button"
        onClick={(e) => {
            e.preventDefault();
            props.handleEdit(e,props.id);
            props.setHide(true);
            }}
      >
        <i className="fa fa-edit"></i> EDIT
      </button>
    </div>
  );
}
 
export default EditTransaction;