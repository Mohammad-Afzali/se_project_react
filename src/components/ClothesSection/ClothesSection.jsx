// import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__section-title">Your Items</p>
        <button
          onClick={handleAddClick}
          className="clothes__section-add-button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section-items">
        {clothingItems
          // .filter((item) => {
          //   return item.weather === weatherData.type;
          // })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;