import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from './../../assets/heroes.png';
import logo from './../../assets/logo.svg';
import api from './../../services/api';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        //Not redirect page
        e.preventDefault();
        try{
            const response = await api.post('/sessions', { id } )
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        }catch(error){
            alert("Usuário inválido.")
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Be the Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login:</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit"> Entrar </button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}