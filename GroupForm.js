import React, { useEffect, useState } from "react";
import { fetchJson, post } from "../../lib/Fetching";
import Select from "react-select";
import NotificationMechanismsSelect from "./NotificationMechanismsSelect";
import PeopleSelect from "./PeopleSelect";
import CompanyBranchesSelect from "./CompanyBranchesSelect";
import TestingCategoriesSelect from "./TestingCategoriesSelect";
import ProductsSelect from "./ProductsSelect";
import TechniquesSelect from "./TechniquesSelect";
import MatricesSelect from "./MatricesSelect";
import { MinimalContainer } from "../sample_reporting/Theme";
import styled, { css } from "styled-components";
import Checkbox from "../common/form/Checkbox";

const Container = styled(MinimalContainer)`
  padding: 20px;
  max-width: 1920px;
  margin: 0 auto;
`;

export default function GroupForm({
  newGroup,
  company_id,
  handleGroupSubmit,
  clientView
}) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [group, setGroup] = useState([]);

  function toggle() {
    setIsShowing(!isShowing);
    setGroup(newGroup);
  }

  useEffect(
    () => {
      setGroup(newGroup);
    },
    [newGroup]
  );

  const onSubmit = e => {
    e.preventDefault();
    handleGroupSubmit({
      group: group
    });
  };

  const handleSelectChange = name => options =>
    setGroup({
      ...group,
      [name]: options.map(i => i.value)
    });

  return (
    <Container>
      <div className="panel-body">
        <button
          onClick={toggle}
          className="btn btn-default"
          style={{ marginBottom: "0px" }}
        >
          {isShowing ? I18n.t("cancel") : I18n.t("add_group")}
        </button>
        <br />
        <br />

        {isShowing && (
          <div>
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-3">
                  <label>Group Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Group Name here..."
                    onChange={e =>
                      setGroup({
                        ...group,
                        name: e.target.value
                      })
                    }
                    value={group.name}
                    style={{ width: "100%", marginBottom: "6px" }}
                  />
                </div>

                <div className="col-md-3">
                  <label>Select Branches</label>
                  <CompanyBranchesSelect
                    handleSelectChange={handleSelectChange}
                    company_id={company_id}
                    company_branch_ids={group.company_branches}
                  />
                </div>

                <div className="col-md-3">
                  <label>Select Products</label>
                  <ProductsSelect
                    handleSelectChange={handleSelectChange}
                    company_id={company_id}
                    product_ids={group.products}
                  />
                </div>

                <div className="col-md-3">
                  <label>Select Matrices</label>
                  <MatricesSelect
                    handleSelectChange={handleSelectChange}
                    company_id={company_id}
                    matrix_ids={group.matrices}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <label>Select Notification Methods</label>
                  <NotificationMechanismsSelect
                    handleSelectChange={handleSelectChange}
                    notification_mechanism_ids={group.notification_mechanisms}
                  />
                </div>

                <div className="col-md-3">
                  <label>Select People</label>
                  <PeopleSelect
                    handleSelectChange={handleSelectChange}
                    company_id={company_id}
                    people_ids={group.people}
                  />
                </div>

                <div className="col-md-3">
                  <label>Select Testing Categories</label>
                  <TestingCategoriesSelect
                    handleSelectChange={handleSelectChange}
                    company_id={company_id}
                    testing_category_ids={group.testing_categories}
                  />
                </div>

                <div className="col-md-3">
                  <label>Select Techniques</label>
                  <TechniquesSelect
                    technique_ids={group.techniques}
                    handleSelectChange={handleSelectChange}
                    company_id={company_id}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-3" style={{ marginTop: "10px" }}>
                  <label>
                    <Checkbox
                      checked={group.include_failed_results}
                      onChange={e =>
                        setGroup({
                          ...group,
                          include_failed_results: e.target.checked
                        })
                      }
                    />
                    &nbsp;&nbsp;
                    {I18n.t("include_failed_results")}
                  </label>
                </div>

                <div className="col-md-3" style={{ marginTop: "10px" }}>
                  <label>
                    <Checkbox
                      checked={group.include_warning_results}
                      onChange={e =>
                        setGroup({
                          ...group,
                          include_warning_results: e.target.checked
                        })
                      }
                    />
                    &nbsp;&nbsp;
                    {I18n.t("include_warning_results")}
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-warning btn-block"
                    style={{
                      marginLeft: "4px",
                      marginBottom: 0,
                      marginTop: "10px"
                    }}
                  >
                    {I18n.t("add_group")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </Container>
  );
}
