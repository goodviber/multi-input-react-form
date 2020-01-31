import React, { useEffect, useState } from "react";
import Checkbox from "../common/form/Checkbox";
import GroupDetails from "./GroupDetails";
import EditGroupForm from "./EditGroupForm";

export default function GroupItem({
  group,
  handleEditGroupSubmit,
  handleExpireGroup,
  company_id
}) {
  const [showDetails, setShowDetails] = useState(false);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <li className="todo" style={{}}>
      <div className="todo-main">
        <div style={{ paddingTop: 3 }}>
          <button
            onClick={toggleDetails}
            className="btn btn-default btn-xs"
            style={{ marginBottom: 0, marginLeft: 8 }}
          >
            <i className="fa fa-bars" />
          </button>
          &nbsp;&nbsp;
          {group.name}
        </div>
      </div>
      {showDetails && (
        <>
          <GroupDetails
            group={group}
            company_id={company_id}
            handleExpireGroup={handleExpireGroup}
          />
          <EditGroupForm
            group={group}
            company_id={company_id}
            handleEditGroupSubmit={handleEditGroupSubmit}
          />
        </>
      )}
    </li>
  );
}
