import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {Link} from "react-router-dom";

function Privacy() {
    return (
        <Container>
            <h1>Politique de confidentialité</h1>
            <div>
                <h2>Responsable du traitement des données</h2>
                <ul>
                    <li><strong>Nom :</strong> VERSCHRAEGEN Gauthier</li>
                    <li><strong>Téléphone :</strong> +32 471/76.25.94</li>
                    <li><strong>Mail :</strong> gauth.vrsgn@outlook.be</li>
                </ul>
            </div>
            <div>
                <h2>Nature des données collectées et objectif de leur collecte (cookies)</h2>
                <p>
                    Lors de votre utilisation de notre site web, nous ne récupérons aucune de vos données personnelles. Des cookies sont utilisés par notre système afin de vous authentifier.
                </p>
                <p>
                    Si un utilisateur de la plateforme de la plateforme souhaite s'inscrire afin d'intégrer l'association, il lui sera demandé d'entrer son nom, son prénom, son adresse email, deux mots de passe identiques ainsi que des informations permettant de la contacter ainsi que des motvations à rejoindre l'association. Les données entrées ici seront permettront aux coordinateurs de l'association d'identifier chaque utilisateur, ainsi que de les contacter directement dans le cadre d'actviitées liées à l'association.
                </p>
                <p>
                    Si un utilisateur de la plateforme souhaite effectuer une donation, il lui sera demandé d'entrer son nom, son prénom ainsi que des informations permattant de le contacter ainsi que la description de la donation. Ces informations permettront aux coordinateur d'identifier la personne à l'origine de la donation ainsi que de la contacter dans l'optique de récupérer la donation.
                </p>
            </div>
            <div>
                <h2>Sécurisation des données personnelles</h2>
                <p>
                    Toutes les données citées ci-dessus sont chiffrées (lecture possible) dans notre base de données, à l'exception du mot de passe des utilisateurs qui est hashé (lecture impossible). Les données personnelles dont la lecture est possible ne sont accessibles que par leur propriétaire afin de pouvoir participer au fonctionnement de l'association en tant que bénévole. Les cooridnateurs auront également accès à ces données dans le cadre du bon fonctionnement des activités de l'association.
                </p>
            </div>
            <div>
                <h2>Méthodes de traitement et de transfert des données</h2>
                <p>
                    Toutes les données que nous utilsons sont enregistrées dans notre système. Nous assurons nous-mêmes le traitement de nos données. Ainsi, aucune de nos données n'est transmise à une entité tierse.
                </p>
            </div>
            <div>
                <h2>Droits des utilisateurs sur leurs données personnelles</h2>
                <p>
                    Si un utilisateur propose une donation à l'association, il lui est possible de demander la suppression des données personnelles liées à la donation. Pour cela, l'utilisateur devra contacter un membre du comité de l'association ou l'éditeur du site (voir <Link to={"/legals"}>Mentions légales</Link>). La requeête sera alors exécutée dans les plus brefs délais.
                </p>
                <p>
                    Un utilisateur authentifié par le système pourra toujours consulter et modifier les informations personnelles que l'association a enregistrées à l'adresse <Link to={"/user/profile"}>https://www.rixref.be/user/profile</Link>. Ce même utilisateur aura également la possibilité à tout moment de supprimer son compte à l'adresse <Link to={"/user/profile/delete"}>https://www.rixref.be/user/profile/delete</Link>. A la fin de ce processus, le compte sera désactivé et aucune des données conservées ne permettra d'identifier l'ancien détenteur du compte.
                </p>
            </div>
        </Container>
    )
}

export default Privacy;