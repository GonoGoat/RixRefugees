import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";

function Usage() {
    return (
        <Container>
            <h1>Conditions Générales d'Utilisation (CGU)</h1>
            <div>
                <h2>Inscription en tant que bénévole</h2>
                <p>
                    Chaque utilisateur de la plateforme a la possibilité de se proposer comme bénévole pour l'association en s'inscrivant à cette plateforme à l'adresse <Link to={"/register"}>https://www.rixref.be/register</Link>. Il ne sera possible à un utilisateur de postuler comme bénévole que s'il accepte de se soumettre à notre <Link to={'/privacy'}>politique de confidentialité</Link> ainsi qu'à nos conditions d'utilisation. Une fois la candidature postée, votre compte ne sera accessible qu'après validation de votre candidature par un coordinateur. Si votre candidature est refusée, votre compte sera alors supprimé.
                </p>
            </div>
            <div>
                <h2>Donation</h2>
                <p>
                    Chaque utilisateur de la plateforme a la possibilité de faire un don à l'association à l'adresse <Link to={"/donations"}>https://www.rixref.be/donations</Link>. Il ne sera possible à un utilisateur de proposer une donation que s'il accepte de se soumettre à notre <Link to={'/privacy'}>politique de confidentialité</Link> ainsi qu'à nos conditions d'utilisation. Une fois la donation postée, les coordinateurs de l'association contacteront l'utilisateur en utilisant les informations de contact fournies avec la description de la donation.
                </p>
            </div>
            <div>
                <h2>Statut de bénévole</h2>
                <p>
                    Un utilisateur dont la candidature a été acceptée acquit le statut de bénévole. Il peut donc se rendre disponible pour des tâches prévues par les coordinateurs de l'association et, si la tâche lui est assignée, y participer. Dans le cadre du bon fonctionnement de la plateforme, les coordinateurs auront alors accès aux données permettant de vous identifier et de vous contacter.
                </p>
                <p>
                    De la même manière qu'un bénévole peut supprimer son propre compte, il peut être décidé par un coordinateur de suspendre le compte d'un utilisateur authentifié pour n'importe quel motif. L'utilisateur ne pourra donc plus accéder à son compte et toutes ses données personnelles seront supprimées.
                </p>
            </div>
            <div>
                <h2>Statut de coordinateur</h2>
                <p>
                    Les coordinateurs de l'association ont un accès à des fonctionnalités avancées de la plateforme. Elles permettent aux personnes en charge de l'association de gérer le fonctionnement de l'association ainsi que de la plateforme.
                </p>
            </div>
            <div>
                <h2>Responsabilités de l'association</h2>
                <p>
                    L'association s'engage à ce que cette plateforme soit accessible, fonctionnelle, et que les informations présentées à ses utilisateurs soient vraies et n'aient pas été altérées. L'association s'engage également à n'utiliser les données personnelles de chaque utilisateur que dans le cadre des activités de l'association. Ces données ne seront accessibles qu'aux coordinateur de l'ASBL.
                </p>
                <p>
                    Toutefois, l'association ne pourra pas être responsable d'un problème lié à l'hébergement de la plateforme ou au fonctionnement de son nom de domaine.
                </p>
            </div>
            <div>
                <h2>Responsabilités des utilisateurs</h2>
                <p>
                    L'utilisateur est responsable des informations qu'il fournit à l'association. Ainsi, l'utilisateur veillera a être honnête dans les données transmises à l'association, tout en veillant à rester poli et courtois dans les champs textuels libres.
                </p>
                <p>
                    Chaque utilisateur veillera également à n'effectuer que des actions auxquelles il peut accéder, et ce sans exploiter ou endommager un élément de l'infrastructure de RixRefugees. Si un erreur apparaît, l'utilisateur sera prié de la transmettre à l'éditeur du site. Toute exploitation de la plateforme peut mener à un bannissement de l'association ainsi qu'à la suppression du compte de l'utilisateur sur la plateforme web.
                </p>
            </div>
        </Container>
    )
}

export default Usage;