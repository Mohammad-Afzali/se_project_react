import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const isOwn = item.owner === currentUser?._id;

  const cardLikeClassName = `card__like ${isOwn ? "" : "card__like_hidden"} ${
    isLiked ? "card__like_liked" : ""
  } `;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={cardLikeClassName}
          type="button"
          onClick={handleLike}
        />
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={`Image of ${item.name}`}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;