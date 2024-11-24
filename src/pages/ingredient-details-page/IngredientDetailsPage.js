import {useDispatch, useSelector} from "react-redux";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getIngredients} from "../../services/actions/constructor/ingredients";
import styles from "./ingredient-details.module.css";

function IngredientDetailsPage() {
    const dispatch = useDispatch();

    const ingredientsById = useSelector(state => state.ingredients.ingredientsById);
    const {id} = useParams();

    useEffect(() => {
        if (!Object.keys(ingredientsById).length) {
            dispatch(getIngredients());
        }
    }, [dispatch, ingredientsById]);

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