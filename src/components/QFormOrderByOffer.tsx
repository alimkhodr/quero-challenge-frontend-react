import { FC } from "react";
import QHeading from "./QHeading";
import QInputRadio from "./QInputRadio";

interface QFormOrderByOfferProps {
  selectedOrder: string;
  onOrderChange: (order: string) => void;
}

const QFormOrderByOffer: FC<QFormOrderByOfferProps> = ({ selectedOrder, onOrderChange }) => {
  return (
    <form action="#">
      <QHeading tag="h2" size="sm" className="mb-2">
        Ordenar
      </QHeading>
      
      <QInputRadio
        label="Cursos de A-Z"
        name="order-by"
        value="course-name"
        checked={selectedOrder === "course-name"}
        onChange={() => onOrderChange("course-name")}
      />
      
      <QInputRadio
        label="Menor preço"
        name="order-by"
        value="price"
        checked={selectedOrder === "price"}
        onChange={() => onOrderChange("price")}
      />
      
      <QInputRadio
        label="Melhor avaliados"
        name="order-by"
        value="rating"
        checked={selectedOrder === "rating"}
        onChange={() => onOrderChange("rating")}
      />
    </form>
  );
};

export default QFormOrderByOffer;
