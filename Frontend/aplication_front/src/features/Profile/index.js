import React, {useState, useEffect} from 'react';
import logo from './../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import api from './../../services/api';
import './styles.css';
import Case from '../../components/item_case/case';

export default function Profile(){
    const [incidents, setIncidents] = useState([])
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const history = useHistory();

    useEffect(() => {
        api.get('/get_incidents_ong', {
            headers: {
                    Authorization: ongId
                }
        }).then(response => {
            setIncidents(response.data.incidents)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/delete_incident/${id}`,{
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(incidents.filter( incident => incident.id !== id));
        }catch(err){
            alert("Erro ao deletar incidente, tente novamente.")
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be the hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map((incident, index) => (
                    <li key={incident.id}>
                        <Case onClickDelete={(id) => handleDeleteIncident(id)} incident={incident}/>
                    </li>
                 ))}
            </ul>
        </div>
    );
}