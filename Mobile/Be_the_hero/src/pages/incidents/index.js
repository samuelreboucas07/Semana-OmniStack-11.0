import React, {useEffect, useState} from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from './../../assets/logo.png';
import styles from './styles';
import Incident from './../../components/incident';
import api from './../../services/api';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }
    
    async function loadIncidents(){
        if(loading){
            return;
        } if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('get_all_incidents', {
            params: { page }
        });
        
        setIncidents([...incidents, ...response.data.incidents]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList 
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={ incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                   <Incident onPress={(incident) => navigateToDetail(incident)} incident={incident}/>
                )}
            />
        </View>
    )
}