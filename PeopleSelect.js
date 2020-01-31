import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";

export default function PeopleSelect({
  people_ids,
  company_id,
  handleSelectChange,
  defaultValue
}) {
  const [people, setPeople] = useState([]);

  const fetchPeople = () =>
    fetchJson("/people.json", { company_id }).then(json => {
      if (json.error) alert(json.error);
      else setPeople(json);
    });

  useEffect(
    () => {
      fetchPeople();
    },
    [company_id]
  );

  const displayOptions = people.map(b => ({
    value: b.id,
    label: b.first_name + b.surname
  }));

  const selectedOptions = displayOptions.filter(o =>
    people_ids.includes(o.value)
  );

  return (
    <Select
      value={selectedOptions}
      isMulti={true}
      placeholder={"People..."}
      name="people"
      options={displayOptions}
      onChange={handleSelectChange("people")}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
