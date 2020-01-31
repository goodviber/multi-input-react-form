import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";

export default function TestingCategoriesSelect({
  testing_category_ids,
  defaultValue,
  company_id,
  handleSelectChange
}) {
  const [testingCategories, setTestingCategories] = useState([]);

  const fetchTestingCategories = () =>
    fetchJson("/testing/testing_categories.json").then(json => {
      if (json.error) alert(json.error);
      else setTestingCategories(json);
    });

  useEffect(
    () => {
      fetchTestingCategories();
    },
    [company_id]
  );

  const displayOptions = testingCategories.map(b => ({
    value: b.id,
    label: b.name
  }));

  const selectedOptions = displayOptions.filter(o =>
    testing_category_ids.includes(o.value)
  );

  return (
    <Select
      value={selectedOptions}
      isMulti={true}
      placeholder={"Testing Categories..."}
      name="testing_categories"
      options={displayOptions}
      onChange={handleSelectChange("testing_categories")}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
