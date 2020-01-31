import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";

export default function ProductsSelect({
  product_ids,
  company_id,
  handleSelectChange,
  defaultValue
}) {
  const [products, setProducts] = useState([]);

  const fetchProducts = () =>
    fetchJson("/products/products.json", { company_id }).then(json => {
      if (json.error) alert(json.error);
      else setProducts(json.products);
    });

  useEffect(
    () => {
      fetchProducts();
    },
    [company_id]
  );

  const displayOptions = products.map(b => ({
    value: b.id,
    label: b.name
  }));

  const selectedOptions = displayOptions.filter(o =>
    product_ids.includes(o.value)
  );

  return (
    <Select
      value={selectedOptions}
      isMulti={true}
      placeholder={"Products..."}
      name="products"
      options={displayOptions}
      onChange={handleSelectChange("products")}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
