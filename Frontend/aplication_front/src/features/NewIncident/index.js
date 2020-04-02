import React, { useState } from 'react';
import './styles.css';
import logo from './../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from './../../services/api';

export default function Incident(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    const history =useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        try{
            const data = {
                title,
                description,
                value
            }
            const response = await api.post('/create_incident', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        }catch(err){
            alert("Erro ao cadastrar novo incidente, tente novamente.")
        }
    }

    return(
        <div className="new-incidents-container">
        <div className="content">
            <section>
                <img src={logo} alt="Be the hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para o início
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Título do caso" 
                    value={title}
                    onChange={e  => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em reais" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}