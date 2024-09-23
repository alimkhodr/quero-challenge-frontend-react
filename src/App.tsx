import { useState, useEffect } from "react";
import axios from "axios";
import QHeader from "./components/QHeader";
import QInput from "./components/QInput";
import QButton from "./components/QButton";
import QCardOffer from "./components/QCardOffer";
import QFooter from "./components/QFooter";
import QLayout from "./components/QLayout";
import QListCard from "./components/QListCard";
import QFormOrderByOffer from "./components/QFormOrderByOffer";
import QFormFilterOffer from "./components/QFormFilterOffer";
import QSectionForm from "./components/QSectionForm";

const App: React.FC = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("course-name"); // Estado para armazenar a opção de ordenação

  useEffect(() => {
    axios
      .get("http://localhost:3000/offers")
      .then((response) => {
        setOffers(response.data);
        setFilteredOffers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar as ofertas:", error);
      });
  }, []);

  const handleSearch = () => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = offers.filter((offer) =>
      offer.courseName.toLowerCase().startsWith(lowerCaseTerm)
    );
    setFilteredOffers(filtered);
  };

  const handleOrderChange = (order: string) => {
    setOrderBy(order);
    sortOffers(order, filteredOffers);
  };

  const sortOffers = (order: string, offersToSort: any[]) => {
    let sortedOffers;
    switch (order) {
      case "course-name":
        sortedOffers = [...offersToSort].sort((a, b) =>
          a.courseName.localeCompare(b.courseName)
        );
        break;
      case "price":
        sortedOffers = [...offersToSort].sort((a, b) =>
          a.offeredPrice - b.offeredPrice
        );
        break;
      case "rating":
        sortedOffers = [...offersToSort].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedOffers = offersToSort;
    }
    setFilteredOffers(sortedOffers);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <QLayout
      header={
        <QHeader>
          <QInput
            type="search"
            id="site-search"
            name="q"
            placeholder="Busque o curso ideal para você"
            aria-label="Buscar cursos e bolsas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <QButton type="button" onClick={handleSearch}>
            Buscar
          </QButton>
        </QHeader>
      }
      sidebar={<QFormFilterOffer />}
      footer={<QFooter />}
    >
      <QSectionForm
        title="Veja as opções que encontramos"
        orderBy={
          <QFormOrderByOffer
            selectedOrder={orderBy} // Passa a opção selecionada
            onOrderChange={handleOrderChange} // Passa a função de alteração
          />
        }
        filter={<QFormFilterOffer />}
      />

      <div className="mt-6">
        <QListCard cards={filteredOffers}>
          {(card) => (
            <QCardOffer
              key={card.id}
              courseName={card.courseName}
              rating={card.rating}
              fullPrice={String(card.fullPrice)}
              offeredPrice={String(card.offeredPrice)}
              discount={String(card.discount)}
              kind={card.kind}
              level={card.level}
              iesLogo={card.iesLogo}
              iesName={card.iesName}
            />
          )}
        </QListCard>
      </div>
    </QLayout>
  );
};

export default App;
