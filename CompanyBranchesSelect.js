import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";

export default function CompanyBranchesSelect({
  defaultValue,
  company_branch_ids,
  company_id,
  handleSelectChange
}) {
  const [companyBranches, setCompanyBranches] = useState([]);

  const fetchCompanyBranches = () =>
    fetchJson("/company_branches.json", {
      company_id
    }).then(json => {
      if (json.error) alert(json.error);
      else setCompanyBranches(json);
    });

  useEffect(
    () => {
      fetchCompanyBranches();
    },
    [company_id]
  );

  const displayOptions = companyBranches.map(b => ({
    value: b.id,
    label: b.name
  }));

  const selectedOptions = displayOptions.filter(o =>
    company_branch_ids.includes(o.value)
  );

  return (
    <Select
      value={selectedOptions}
      isMulti={true}
      placeholder={"Company Branches..."}
      name="company_branches"
      options={displayOptions}
      onChange={handleSelectChange("company_branches")}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
