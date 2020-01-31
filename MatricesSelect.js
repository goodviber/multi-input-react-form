import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";

export default function MatricesSelect({
  matrix_ids,
  company_id,
  defaultValue,
  handleSelectChange
}) {
  const [matrices, setMatrices] = useState([]);
  const [focused, setFocused] = useState(false);

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  function placeholder() {
    return focused
      ? I18n.t("start_typing_to_filter_matrices")
      : I18n.t("select_matrices");
  }

  const fetchMatrices = () =>
    fetchJson("/matrices.json").then(json => {
      if (json.error) alert(json.error);
      else setMatrices(json);
    });

  useEffect(
    () => {
      fetchMatrices();
    },
    [company_id]
  );

  const displayOptions = matrices.map(b => ({
    value: b.id,
    label: b.name
  }));

  const selectedOptions = displayOptions.filter(o =>
    matrix_ids.includes(o.value)
  );

  const fetchData = search =>
    fetchJson("/matrices.json", { "form[search]": search }).then(records =>
      records.map(m => ({ label: m.name, value: m.id }))
    );

  return (
    <AsyncSelect
      value={selectedOptions}
      placeholder={placeholder()}
      onFocus={onFocus}
      onBlur={onBlur}
      isMulti={true}
      simpleValue={true}
      autoload={true}
      id="technique_id"
      loadOptions={fetchData}
      isClearable
      onChange={handleSelectChange("matrices")}
    />
  );
}
