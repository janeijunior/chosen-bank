import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Home.module.css'
import './script.js'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import { MDBDataTable } from 'mdbreact';
//
//function Home() {
//  const [pets, setPets] = useState([])
//
//  useEffect(() => {
//    api.get('/pets').then((response) => {
//      setPets(response.data.pets)
//    })
//  }, [])
//
//  return (
//    <section>
//      <div className={styles.pet_home_header}>
//        <h1>Home</h1>
//        <p>\frontend\src\components\pages\Home.js</p>
//      </div>
//      <div className={styles.pet_container}>
//        {pets.length > 0 &&
//          pets.map((pet) => (
//            <div className={styles.pet_card} key={pet._id}>
//              <div
//                style={{
//                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
//                }}
//                className={styles.pet_card_image}
//              ></div>
//              <h3>{pet.name}</h3>
//              <p>
//                <span className="bold">Peso:</span> {pet.weight}kg
//              </p>
//              {pet.available ? (
//                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
//              ) : (
//                <p className={styles.adopted_text}>testado!</p>
//              )}
//            </div>
//          ))}
//        {pets.length === 0 && (
//          <p> zerado</p>
//        )}
//      </div>
//    </section>
//  )
//}



const Home = () => {
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Position',
        field: 'position',
        sort: 'asc',
        width: 270
      }

    ],
    rows: [
      {
        name: 'Garrett Nixon',
        position: 'System Architect',
        office: 'Edinburgh'
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo'
      }
    ]
  };
  
  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
  
}

export default Home

