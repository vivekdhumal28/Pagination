import { useState } from "react";
import { useEffect } from "react";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const selectPageHandler = (selectPage) => {
    if (
      selectPage >= 1 &&
      selectPage <= products.length / 10 &&
      selectPage !== page
    )
      setPage(selectPage);
  };
  // fetch the data
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data?.products);
    }

    // console.log(data?.products);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span key={product.id} className="products__single">
                <img alt={product.title} src={product.thumbnail} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <>
          <div className="pagination">
            <span
              className={page > 1 ? "" : "pagination__disable"}
              onClick={() => selectPageHandler(page - 1)}
            >
              ◀️
            </span>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}

            <span
              className={
                page < products.length / 10 ? "" : "pagination__disable"
              }
              onClick={() => selectPageHandler(page + 1)}
            >
              ▶️
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
