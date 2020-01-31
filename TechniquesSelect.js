import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";

export default function TechniquesSelect({
  technique_ids,
  company_id,
  defaultValue,
  handleSelectChange
}) {
  const [techniques, setTechniques] = useState([]);
  const [focused, setFocused] = useState(false);

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  function placeholder() {
    return focused
      ? I18n.t("start_typing_to_filter_techniques")
      : I18n.t("select_techniques");
  }

  const fetchTechniques = () =>
    fetchJson("/techniques.json").then(json => {
      if (json.error) alert(json.error);
      else setTechniques(json);
    });

  useEffect(
    () => {
      fetchTechniques();
    },
    [company_id]
  );

  const displayOptions = techniques.map(b => ({
    value: b.id,
    label: b.name
  }));

  const selectedOptions = displayOptions.filter(o =>
    technique_ids.includes(o.value)
  );

  const fetchData = search =>
    fetchJson("/techniques.json", { "form[search]": search }).then(records =>
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
      onChange={handleSelectChange("techniques")}
    />
  );
}
