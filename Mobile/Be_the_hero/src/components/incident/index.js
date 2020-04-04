import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Incident(props){
    return(
    <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{props.incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{props.incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', 
                                            { style: 'currency', currency: 'BRL'})
                                            .format(props.incident.value)}
        </Text>

        <TouchableOpacity style={styles.detailsButton}
            onPress={() => {props.onPress(props.incident)}}
        >
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>   
            <Icon name="arrow-right" size={16} color="#E02041" />     
        </TouchableOpacity>
    </View>
    )
}