import React, {useState, useEffect} from 'react';
import './home.css'
import axios from 'axios';
import Navbar from '../navbar/navbar'
import Sidenav from '../navbar/Sidenav';
import { Line } from 'rc-progress';
import CanvasJSReact from '../canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Home(){
    
    //To set range of report
    //----------------------
    const times = ["Yearly", "Monthly", "Weekly" ]
    const [range, setRange] = useState(times[0]);
    const types = ["bar", "pie", "doughnut"];
    const [chart, setChart] = useState(types[0]);
    const [render, setRender] = useState(false);
    const [reports, setReports] = useState([]);
    const [sum, setSum] = useState('');
    const [goal, setGoal] = useState('');
    const [rangeGoal, setRangeGoal] = useState('');
    const [newRangeGoal, setNewRangeGoal] = useState('');
    useEffect(() => {
        const getData = (time)=>{
            axios.get(`http://localhost:8000/api/reports/${time}`).then((response) => {
            setReports(response.data.reports);
            setSum(response.data.sum);
            })
        }
        getData(range)
    },[render]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/goals/1').then((response) => {
            setGoal(response.data.yearly)
            if(range == times[0]){
                setRangeGoal(response.data.yearly)
            }else if(range == times[1]){
                setRangeGoal(response.data.yearly/12)
            }else if(range == times[2]){
                setRangeGoal(response.data.yearly/52.143)
            }
        });
    },[newRangeGoal]);
    const editGoal = async (e) => {
        e.preventDefault();
        let test = newRangeGoal
        if(range == times[0]){
            test*=1
        }else if(range == times[1]){
            test*=12;
        }else if(range == times[2]){
            test*=52.143;
        }
        try{
            axios.put('http://localhost:8000/api/goals/1', {
              yearly: test
            }).then((response) => {
                console.log('updated');
                setNewRangeGoal('');
            })
          }catch(err){
            console.log(err);
          }
          setRender(!render)
      }
      const handleRange = (e)=>{
        setRange(e);
        if(e == times[0]){
            setRangeGoal(goal/1);
        }else if(e == times[1]){
            setRangeGoal((goal/12));
        }else if(e == times[2]){
            setRangeGoal(goal/52.143);
        }
        setRender(!render);
      }
    const dataPointsIncome = reports.map((report)=>{
        return ({y: report.category_income, label: report.category_name})
    });
    const dataPointsExpenses = reports.map((report)=>{
        return ({y: report.category_expenses, label: report.category_name})
    });
    //To set up chart
     const optionsIncome= {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Income"
        },
        axisX: {
            title: "Categories",
            reversed: true,
        },
        axisY: {
            title: "Income",
            includeZero: true,
            labelFormatter: addSymbols
        },
        data: [{
            type: chart,
            dataPoints: dataPointsIncome
            // [
            //     { y:  2200000000, label: categories[0]},
            //     { y:  1800000000, label: categories[1]}
            // ]
        }]
    }
    const optionsExpenses= {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Expenses"
        },
        axisX: {
            title: "Categories",
            reversed: true,
        },
        axisY: {
            title: "Expenses",
            includeZero: true,
            labelFormatter: addSymbols
        },
        data: [{
            type: chart,
            dataPoints: dataPointsExpenses
        }]
    }
    function addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
            }
    return(
        <div className='reports'>
            <Navbar/>
            <Sidenav />
            <h1>Reports</h1>
            <div className = "reports-head">
                <div className = "reports-goal">
                    <p>Current {range} Goal: {Number.parseFloat(rangeGoal).toFixed(2)}$</p>
                    <div>
                        <input type='number' id="newGoal" name="newGoal" value={newRangeGoal} onChange={(e)=>{setNewRangeGoal(e.target.value)}}/>
                        <button className="income-items"onClick={(e)=>{editGoal(e)}}>Change Goal</button>
                    </div>
                </div>
                <div className="reports-progress">
                    <label>{Number.parseFloat(sum/rangeGoal).toFixed(2)}%</label>
                    <Line percent={sum/rangeGoal} strokeWidth="2" trailColor="rgba(36, 38, 59, 0.2)" strokeColor="#24263b" />
                </div>
                <div className='reports-select'>
                    <select className="income-items" name="range" id="range" value={range} onChange={(e) => {handleRange(e.target.value)}}>
                        {times.map((time,index) =>{ 
                        return (
                            <option key={index} value={time}>
                                {time}
                            </option>)}
                        )}
                    </select>
                    <select className="income-items" name="chart" id="chart" value={chart} onChange={(e) => {setChart(e.target.value); setRender(!render)}}>
                        {types.map((type,index) =>{ 
                        return (
                            <option key={index} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1) + " Chart"}
                            </option>)}
                        )}
                    </select>
                </div>
            </div>
            <div className='income-visuals'>
                <div className='income-chart'>
                    <CanvasJSChart options = {optionsIncome}
                        /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/} 
                </div>
                <div className='income-chart'>
                    <CanvasJSChart options = {optionsExpenses}
                    />
                </div>
            </div>
        </div>
    )
}
export default Home;