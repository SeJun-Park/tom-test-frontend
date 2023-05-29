import { useParams } from "react-router-dom"
import ProtectedPage from "../components/ProtectedPage";

export default function UpdateTeam() {

    const { teamPk } = useParams();

    return (
        <ProtectedPage>
            <div></div>
        </ProtectedPage>
    )
}