## src\App.tsx
```Typescript
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
```
ultilizando axios para puxar dados e useEffect para puxar ao iniciar aplicação.

```Typescript
const handleSearch = () => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = offers.filter((offer) =>
      offer.courseName.toLowerCase().startsWith(lowerCaseTerm)
    );
    setFilteredOffers(filtered);
  };
```
ação de procurar.

```Typescript
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
```
ação de ordenar.

## src\components\QCardOffer.tsx
```Typescript
const calculateDiscount = (fullPrice: string, offeredPrice: string) => {
  const full = parseFloat(fullPrice);
  const offered = parseFloat(offeredPrice);
  if (full && offered) {
    const discount = ((full - offered) / full) * 100;
    return `-${Math.round(discount)}%`;
  }
  return null;
};

```
calcular desconto em %.

```Typescript
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
```
formatações.

## src\components\QHeader.tsx
```Typescript
<figure className="flex items-center h-full w-60">
```
mudança da largura com Tailwind.

## src\components\QIconStar.tsx
```Typescript
      {empty ? (
        <path
          d="M10 15.75L5.96875 17.9062C5.65625 18.0625 5.21875 18.0625 4.9375 17.8125C4.625 17.5938 4.46875 17.2188 4.53125 16.8438L5.28125 12.2812L2.03125 9.0625C1.78125 8.8125 1.6875 8.40625 1.78125 8.0625C1.90625 7.6875 2.21875 7.4375 2.59375 7.375L7.09375 6.71875L9.09375 2.5625C9.25 2.21875 9.59375 2 10 2C10.375 2 10.7188 2.21875 10.875 2.5625L12.9062 6.71875L17.375 7.375C17.75 7.4375 18.0625 7.6875 18.1875 8.0625C18.3125 8.40625 18.2188 8.8125 17.9375 9.0625L14.6875 12.2812L15.4688 16.8438C15.5312 17.2188 15.375 17.5938 15.0625 17.8125C14.75 18.0625 14.3438 18.0625 14 17.9062L10 15.75Z"
          fill="#E0E0E0"
        />
```
adição do icone de estrela vazia.

## src\components\QLayout.tsx
```Typescript
<aside className="pr-8 border-r py-6 h-full w-60 hidden lg:flex">{sidebar}</aside>
```
mudança da largura e desabilitar para telas abaixo de 1023px com Tailwind.

## src\components\QListCard.tsx
```Typescript
    <ul
      {...rest}
      className="flex flex-row flex-wrap gap-4"
    >
```
cards alinhados corretamente e com espaçamento com Tailwind.

## src\components\QRating.tsx
```Typescript
onst QRating: FC<QBadgeProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <QText tag="span">{rating.toFixed(1)}</QText>
  
      <div className="flex items-center space-x-1 text-white">
        {Array.from({ length: fullStars }).map((_, index) => (
          <QIconStar/>
        ))}
        
        {hasHalfStar && <QIconStar half />}

        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, index) => (
          <QIconStar empty />
        ))}
      </div>
    </div>
  );
};
```
atualização das estrelas de acordo com o rating.
