import ItemCard from './ItemCard';
//import { defaultClothingItems } from '../utils/constants';
import '../blocks/clothesSection.css';

function ClothesSection({ onCardClick, clothingItems }) {
  return (
    <div>
      <div className="clothes__section">
        <p>Your Items</p>
        <button className="clothes__section-add-btn">+ Add New</button>
      </div>
      <ul className="clothes__section-items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
            ></ItemCard>
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
