import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";

function Legals() {
    return (
        <Container>
            <h1>Mentions légales de l'association RixRefugees</h1>
            <div>
                <h2>Données de l'association</h2>
                <ul>
                    <li><strong>Nom :</strong> RixRefugees</li>
                    <li><strong>Type d'organisation :</strong> Association de fait</li>
                    <li><strong>Description :</strong> Antenne locale de la Plateforme Citoyenne de Soutien aux Réfugiés ASBL</li>
                    <li><strong>Coordonnées de la Plateforme Citoyenne de Soutien aux Réfugiés ASBL :</strong> 186 rue Washington, 1050 Ixelles, BE04 5230 8077 7231 TRIOBEBB</li>
                </ul>
            </div>
            <div>
                <h2>Responsables de l'association</h2>
                <p>
                    L'association étant solidaire, elle ne comprend pas de président. Les membres du comité sont les suivants :
                </p>
                <table>
                    <thead>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Adresse</th>
                        <th>Rôle</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Delestienne</td>
                            <td>Sandra</td>
                            <td>Rue des Templiers 60, 1331 Rosières</td>
                            <td>Trésorière</td>
                        </tr>
                        <tr>
                            <td>Deville</td>
                            <td>Marc</td>
                            <td>Rue de la Rose 25/6, 1435 Corbais</td>
                            <td>Remplaçant trésorier</td>
                        </tr>
                        <tr>
                            <td>Dossogne</td>
                            <td>Marie</td>
                            <td>Avenue Paul Terlinden 37, 1330 Rixensart</td>
                            <td>/</td>
                        </tr>
                        <tr>
                            <td>Haesen</td>
                            <td>Valérie</td>
                            <td>Chaussée de Wavre 8A, 1330 Rixensart</td>
                            <td>Remplaçante secrétaire</td>
                        </tr>
                        <tr>
                            <td>Rigo</td>
                            <td>Charlotte</td>
                            <td>Avenue Paola 29, 1330 Rixensart</td>
                            <td>/</td>
                        </tr>
                        <tr>
                            <td>Rigo</td>
                            <td>Stéphanie</td>
                            <td>Colline du Glain 19, 1332 Genval</td>
                        </tr>
                        <tr>
                            <td>Streydio</td>
                            <td>Céline</td>
                            <td>Rue de Froidmont 9, 1330 Rixensart</td>
                            <td>Secrétaire</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Editeur du site</h2>
                <ul>
                    <li><strong>Nom :</strong> VERSCHRAEGEN Gauthier</li>
                    <li><strong>Téléphone :</strong> +32 471/76.25.94</li>
                    <li><strong>Mail :</strong> gauth.vrsgn@outlook.be</li>
                </ul>
            </div>
            <div>
                <h2>Hébergeur du site</h2>
                <ul>
                    <li><strong>Nom :</strong> 1&1 IONOS SARL</li>
                    <li><strong>Téléphone :</strong> 0970 808 911</li>
                    <li><strong>Mail :</strong> info@IONOS.fr</li>
                    <li><strong>Adresse :</strong> 7, place de la Gare, BP 70109, 57200 Sarreguemines Cedex,  431 303 775 RCS Sarreguemines</li>
                </ul>
            </div>
        </Container>
    )
}

export default Legals;