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

export default function EditGroupForm({
  group,
  company_id,
  clientView,
  handleEditGroupSubmit
}) {
  const [editGroup, setEditGroup] = useState({
    id: group.id,
    name: group.name,
    include_failed_results: group.include_failed_results,
    include_warning_results: group.include_warning_results,
    company_branches: group.company_branches.map(cb => cb.id),
    notification_mechanisms: group.notification_mechanisms.map(cb => cb.id),
    people: group.people.map(cb => cb.id),
    testing_categories: group.testing_categories.map(cb => cb.id),
    techniques: group.techniques.map(cb => cb.id),
    matrices: group.matrices.map(cb => cb.id),
    products: group.products.map(cb => cb.id)
  });

  const onSubmit = e => {
    e.preventDefault();
    handleEditGroupSubmit({
      group: editGroup
    });
  };

  const handleSelectChange = name => options =>
    setEditGroup({
      ...editGroup,
      [name]: options.map(i => i.value)
    });

  return (
    <Container>
      <div className="panel-body">
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
                  setEditGroup({
                    ...editGroup,
                    name: e.target.value
                  })
                }
                value={editGroup.name}
                style={{ width: "100%", marginBottom: "6px" }}
              />
            </div>

            <div className="col-md-3">
              <label>Select Branches</label>
              <CompanyBranchesSelect
                handleSelectChange={handleSelectChange}
                company_id={company_id}
                company_branch_ids={editGroup.company_branches}
              />
            </div>

            <div className="col-md-3">
              <label>Select Products</label>
              <ProductsSelect
                handleSelectChange={handleSelectChange}
                company_id={company_id}
                product_ids={editGroup.products}
              />
            </div>

            <div className="col-md-3">
              <label>Select Matrices</label>
              <MatricesSelect
                handleSelectChange={handleSelectChange}
                company_id={company_id}
                matrix_ids={editGroup.matrices}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <label>Select Notification Methods</label>
              <NotificationMechanismsSelect
                handleSelectChange={handleSelectChange}
                notification_mechanism_ids={editGroup.notification_mechanisms}
              />
            </div>

            <div className="col-md-3">
              <label>Select People</label>
              <PeopleSelect
                handleSelectChange={handleSelectChange}
                company_id={company_id}
                people_ids={editGroup.people}
              />
            </div>

            <div className="col-md-3">
              <label>Select Testing Categories</label>
              <TestingCategoriesSelect
                handleSelectChange={handleSelectChange}
                company_id={company_id}
                testing_category_ids={editGroup.testing_categories}
              />
            </div>

            <div className="col-md-3">
              <label>Select Techniques</label>
              <TechniquesSelect
                technique_ids={editGroup.techniques}
                handleSelectChange={handleSelectChange}
                company_id={company_id}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3" style={{ marginTop: "10px" }}>
              <label>
                <Checkbox
                  checked={editGroup.include_failed_results}
                  onChange={e =>
                    setEditGroup({
                      ...editGroup,
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
                  checked={editGroup.include_warning_results}
                  onChange={e =>
                    setEditGroup({
                      ...editGroup,
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
                className="btn btn-primary btn-block"
                style={{
                  marginLeft: "4px",
                  marginBottom: 0,
                  marginTop: "10px"
                }}
              >
                {I18n.t("edit_group")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
