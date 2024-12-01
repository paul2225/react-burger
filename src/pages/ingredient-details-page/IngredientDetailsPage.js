import {useSelector} from "react-redux";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import {useParams} from "react-router-dom";
import styles from "./ingredient-details.module.css";

function IngredientDetailsPage() {
    const ingredientsById = useSelector(state => state.ingredients.ingredientsById);
    const {id} = useParams();

    if (!ingredientsById[id]) {
        return null;
    }

    return (
        <section className={styles.ingredients}>
            <IngredientDetails ingredient={ingredientsById[id]}/>
        </section>
    );
}

export default IngredientDetailsPage;