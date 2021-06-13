import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import join from "../img/join.jpg"

function Join() {
    return (
        <Container style={{textAlign : 'center'}}>
            <Typography variant='h3'>Qui sommes-nous ?</Typography>
            <Typography style={{textAlign : 'left'}}>
                RixRefugees a été crée par une équipe de bénévoles de la Plateforme Citoyenne de Soutien aux Réfugiés s’étant impliquée dans le groupe de travail « Commune Hospitalière » sur Rixensart, Genval, Rosières. Une commune hospitalière s’engage, à son échelle, pour une politique migratoire basée sur l’hospitalité, le respect des droits humains et les valeurs de solidarité.
            </Typography>
            <Typography style={{textAlign : 'left'}}>
                Notre groupe travaille en étroite collaboration avec la commune afin :
                <ul>
                    <li>D’améliorer l’information et l’accueil des personnes migrantes, quel que soit leur statut.</li>
                    <li>De faciliter les démarches pour tous les migrants.</li>
                    <li>De sensibiliser les citoyens de la commune aux questions migratoires.</li>
                    <li>D’améliorer concrètement l’accueil des migrants dans le respect des droits.</li>
                </ul>
            </Typography>
            <Typography style={{textAlign : 'left'}}>
                Pratiquement, RixRefugees permet, grâce au soutien de la commune, de la Région Wallonne et surtout des bénévoles :
                <ul>
                    <li>De proposer 1 à 2 logements collectifs (plus de 4000 nuitées jusqu’à présent (2021))</li>
                    <li>Un accès au centre sportif et piscine pour nos invités</li>
                    <li>Met régulièrement un terrain de foot à disposition afin d’organiser des matches amicaux</li>
                    <li>Publie mensuellement un encart dans le RixInfo</li>
                    <li>Tient un stand à RixEnFête afin de sensibiliser les citoyens à la question migratoire et promouvoir notre activité</li>
                    <li>Fait progresser « Rixensart Commune Hospitalière » via des réunions régulières avec nos élus</li>
                    <li>Crée un réseau d’accueil solidaire avec une page Facebook dépassant les 600 membres, collaborer avec les bénévoles du brabant-wallon voire plus loin, avec les commerces qui se mobilisent en fournissant leurs invendus et ainsi combattre le gaspillage et les associations solidaires permettant des activités plus ludiques.</li>
                </ul>
            </Typography>
            <Typography style={{textAlign : 'left'}}>
                Réseau solidaire formidable !
            </Typography>
            <Typography style={{textAlign : 'left'}}>
                L’équipe RixRefugees<br/>
                Céline, Charlotte, Marc, Marie, Sandra, Stéphanie et Valou Val
            </Typography>
            <img src={join} style={{maxWidth : "500px"}}/>
        </Container>
    )
}

export default Join;