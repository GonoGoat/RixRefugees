import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";

function Error() {
    return (
        <Container>
            <Typography variant='h1'>Oups...</Typography>
            <Typography>La page que nous essayez de joindre n'existe pas. Veuillez revenir vers <Link to={"/"}>la page d'accueil.</Link></Typography>
        </Container>
    )
}

export default Error;