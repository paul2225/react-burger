import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import styles from "./ingredient-details.module.css";

function IngredientDetailsPage() {
    return (
        <section className={styles.ingredients}>
            <IngredientDetails/>
        </section>
    );
}

export default IngredientDetailsPage;