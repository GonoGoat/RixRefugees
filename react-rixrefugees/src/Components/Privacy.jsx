import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {Link} from "react-router-dom";

function Privacy() {
    return (
        <Container style={{textAlign : 'left'}}>
            <Typography variant='h3'>Politique de confidentialité</Typography>
            <Typography variant='h4'>Responsable du traitement des données</Typography>
            <Typography>
                <ul>
                    <li><strong>Nom :</strong> VERSCHRAEGEN Gauthier</li>
                    <li><strong>Téléphone :</strong> +32 471/76.25.94</li>
                    <li><strong>Mail :</strong> gauth.vrsgn@outlook.be</li>
                </ul>
            </Typography>
            <Typography variant='h4'>Nature des données collectées et objectif de leur collecte (cookies)</Typography>
                <Typography>
                    Lors de votre utilisation de notre site web, nous ne récupérons aucune de vos données personnelles. Des cookies sont utilisés par notre système afin de vous authentifier continuellement pendant une durée de 24 heures.
                </Typography>
                <Typography>
                    Si un utilisateur de la plateforme souhaite s'inscrire afin d'intégrer l'association, il lui sera demandé d'entrer son nom, son prénom, son adresse email, deux mots de passe identiques, des informations permettant de la contacter ainsi que ses motivations à rejoindre l'association. Les données entrées ici permettront aux coordinateurs de l'association d'identifier chaque utilisateur et de les contacter directement dans le cadre d'activités liées à l'association.
                </Typography>
                <Typography>
                    Si un utilisateur de la plateforme souhaite effectuer une donation, il lui sera demandé d'entrer son nom, son prénom, des informations permettant de le contacter ainsi que la description de la donation. Ces informations permettront aux coordinateur d'identifier la personne à l'origine de la donation et de la contacter dans l'optique de récupérer la donation.
                </Typography>
                <Typography variant='h4'>Sécurisation des données personnelles</Typography>
                <Typography>
                    Toutes les données citées ci-dessus sont chiffrées (lecture possible) dans notre base de données, à l'exception du mot de passe des utilisateurs qui est hashé (lecture impossible). Les données personnelles dont la lecture est possible ne sont accessibles que par leur propriétaire afin de pouvoir participer au fonctionnement de l'association en tant que bénévole. Les coordinateurs auront également accès à ces données dans le cadre du bon fonctionnement des activités de l'association.
                </Typography>
                <Typography variant='h4'>Méthodes de traitement et de transfert des données</Typography>
                <Typography>
                    Toutes les données que nous utilisons sont enregistrées dans notre système. Nous assurons nous-mêmes le traitement de nos données. Ainsi, aucune de nos données n'est transmise à une entité tierce.
                </Typography>
                <Typography variant='h4'>Droits des utilisateurs sur leurs données personnelles</Typography>
                <Typography>
                    Si un utilisateur propose une donation à l'association, il lui est possible de demander la suppression des données personnelles liées à la donation. Pour cela, l'utilisateur devra contacter un membre du comité de l'association ou l'éditeur du site (voir <Link to={"/legals"}>Mentions légales</Link>). La requête sera alors exécutée dans les plus brefs délais.
                </Typography>
                <Typography>
                    Un utilisateur authentifié par le système pourra toujours consulter et modifier les informations personnelles que l'association a enregistrées à l'adresse <Link to={"/user/profile"}>https://www.rixref.be/user/profile</Link>. Ce même utilisateur aura également la possibilité à tout moment de supprimer son compte à l'adresse <Link to={"/user/profile/delete"}>https://www.rixref.be/user/profile/delete</Link>. A la fin de ce processus, le compte sera désactivé et aucune des données conservées ne permettra d'identifier l'ancien détenteur du compte.
                </Typography>
        </Container>
    )
}

export default Privacy;