import { FC } from "react";
import QHeading from "./QHeading";
import QRating from "./QRating";
import QPrice from "./QPrice";
import QText from "./QText";
import QButton from "./QButton";

interface QCardOfferProps {
  courseName: string;
  rating: number;
  fullPrice: string;
  offeredPrice: string;
  discount: string;
  kind: string;
  level: string;
  iesLogo: string;
  iesName: string;
}

const formatCurrency = (value: string) => {
  const number = parseFloat(value);
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const calculateDiscount = (fullPrice: string, offeredPrice: string) => {
  const full = parseFloat(fullPrice);
  const offered = parseFloat(offeredPrice);
  if (full && offered) {
    const discount = ((full - offered) / full) * 100;
    return `-${Math.round(discount)}%`;
  }
  return null;
};


const QCardOffer: FC<QCardOfferProps> = ({
  courseName,
  rating,
  fullPrice,
  offeredPrice,
  discount,
  kind,
  level,
  iesLogo,
  iesName,
}) => {

  const kindLabel = kind === "presencial" ? "Presencial" : "EaD";
  const levelLabel =
    level === "bacharelado"
      ? "Graduação (bacharelado)"
      : level === "tecnologo"
      ? "Graduação (tecnólogo)"
      : "Graduação (licenciatura)";
  const formattedFullPrice = formatCurrency(fullPrice);
  const formattedOfferedPrice = formatCurrency(offeredPrice);
  const discountPercentage = calculateDiscount(fullPrice, offeredPrice);

  return (
    <article className="bg-white p-6 rounded-lg shadow-sm border flex flex-col justify-between items-start gap-3 w-60">
      <img src={iesLogo} alt={iesName} className="h-10 object-contain" />
      <QHeading tag="h2" size="sm">
        {courseName}
      </QHeading>
      <QRating rating={rating} />
      <QPrice
        fullPrice={formattedFullPrice}
        offeredPrice={formattedOfferedPrice}
        discount={discountPercentage}
      />
      <div>
        <QText tag="p" weight="semibold">{kindLabel}</QText>
        <QText tag="p" color="minor" size="sm">
          {levelLabel}
        </QText>
      </div>
      <QButton tag="a" size="sm" className="w-full">
        Quero esta bolsa
      </QButton>
    </article>
  );
};

export default QCardOffer;
