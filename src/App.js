import './App.css';
import { Select, MenuItem,Typography } from '@material-ui/core';
import React,{ useEffect, useState} from 'react';
import CardItem from './CardItem';
import Table from './Table';
import Graph from './Graph';

function App() {
  const [countries, setCountries]=useState([]);
  const [country, setCountry]=useState('World Wide');
  const [cases, setCases]=useState({});
  const [countryWise, setCountryWise]=useState([]);
  const [graph, setGraph]=useState([]);

  useEffect(()=>{
    async function getData(){
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(res=>res.json())
      .then(data=>{
        const countryObj = data.map(({country, countryInfo})=> ({
          name: country,
          value: countryInfo.iso2
        }));

        var obj=data.map(({country, cases})=>({
          name:country,
          case:cases
        }))
        var arr=obj.sort((a,b)=>a.case>b.case?-1:1);
        setCountryWise(arr);
        setCountries(countryObj)
      })
    }
    getData();
  },[])

  useEffect(async ()=>{
    await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
    .then(res=>res.json())
    .then(data=>{
      console.log(data.cases)
      const arr=[]
      for(let key in data.cases){
        const obj={
          x:key,
          y:data.cases[key]
        }
        arr.push(obj);
      }
      setGraph(arr)
    })
  },[])

  useEffect(async ()=>{
    if(country!='World Wide'){
      await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
      .then(res=>res.json())
      .then(data=>{
        setCases(data);
      })
    }else{
      fetch("https://disease.sh/v3/covid-19/all")
      .then(res=>res.json())
      .then(data=>setCases(data));
    }
  },[country])

  return (
    <div className="App">
        <div className='app_left'>
            <div className='app_header'>
              <h1>COVID-19 TRACKER</h1>
              <Select onChange={(e)=>setCountry(e.target.value)} variant='outlined' value={country}>
                <MenuItem value="World Wide">World wide</MenuItem>
                  {
                    countries.map(({name, value})=>(
                      <MenuItem value={value}>{name}</MenuItem>
                    ))
                  }
              </Select>
            </div>
            <div className='app_card'>
              <CardItem title='Cases' total={cases.cases} todayCases={cases.todayCases}/>
              <CardItem title='Recovered' total={cases.recovered} todayCases={cases.todayRecovered}/>
              <CardItem title='Deaths' total={cases.deaths} todayCases={cases.todayDeaths}/>          
            </div>
        </div>
        <div className='app_right'>
          <Table arr={countryWise}/>  
          <Graph newCases={graph}/>        
        </div>
    </div>
  );
}

export default App;
