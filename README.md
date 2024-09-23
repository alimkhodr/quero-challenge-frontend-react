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

