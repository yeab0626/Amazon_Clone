import React from 'react'
import {catagoryInfo } from './CategoryFullInfo'
import CatagoryCard from './CategoryCard';
import classes from './Category.module.css'


 function Catagory() {
  return (
    <>
    <section className={classes.Catagory_container}>
      {
        catagoryInfo.map((infos)=> (
    <CatagoryCard data={infos}/>
        ))
      }
    </section>

    </>
  )
}


export default  Catagory;