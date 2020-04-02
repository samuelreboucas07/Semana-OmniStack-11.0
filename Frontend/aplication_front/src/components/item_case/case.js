import React from 'react';
import './styles.css';
import { FiTrash } from 'react-icons/fi';

export default function Case(props){
    return(
        <div>
            <strong>CASO:</strong>
            <p>{props.incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{props.incident.description}</p>
            
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.incident.value)}</p>
            <button onClick={() => props.onClickDelete(props.incident.id)} type="button">
                <FiTrash size={18}/>
            </button>
        </div>
    );
}