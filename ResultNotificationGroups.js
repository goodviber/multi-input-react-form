import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson, post } from "../../lib/Fetching";
import GroupForm from "./GroupForm";
import GroupItem from "./GroupItem";

export default function ResultNotificationGroups({ company_id, clientView }) {
  const [groups, setGroups] = useState(false);
  const [group, setGroup] = useState({
    name: "",
    include_failed_results: false,
    include_warning_results: false,
    company_branches: [],
    notification_mechanisms: [],
    people: [],
    testing_categories: [],
    techniques: [],
    matrices: [],
    products: []
  });

  const fetchGroups = () =>
    fetchJson("/result_notifications/result_notification_groups.json", {
      company_id
    }).then(json => {
      if (json.error) alert(json.error);
      else setGroups(json);
      setGroup({
        name: "",
        include_failed_results: false,
        include_warning_results: false,
        company_branches: [],
        notification_mechanisms: [],
        people: [],
        testing_categories: [],
        techniques: [],
        matrices: [],
        products: []
      });
    });

  const handleGroupSubmit = group =>
    post("/result_notifications/result_notification_groups", group)
      .then(fetchGroups)
      .catch(error => alert(error));

  const handleEditGroupSubmit = editGroup => {
    post(
      "/result_notifications/result_notification_groups/" + editGroup.group.id,
      editGroup,
      "PATCH"
    )
      .then(response => {
        if (response.success === "ok") {
          alert("Group Updated");
        }
      })
      .then(fetchGroups)
      .catch(error => alert(error));
  };

  const handleExpireGroup = id => {
    if (
      confirm(
        I18n.t("are_you_sure_you_want_to_delete_this_result_notification_group")
      )
    ) {
      post(
        "/result_notifications/result_notification_groups/" + id,
        {},
        "DELETE"
      )
        .then(fetchGroups)
        .catch(error => alert(error));
    }
  };

  useEffect(
    () => {
      fetchGroups();
    },
    [company_id]
  );

  return (
    <div className="todos">
      <h4>Result Notification Groups</h4>
      {groups &&
        groups.length === 0 && (
          <p>{I18n.t("you_can_assign_result_notification_groups")}</p>
        )}
      <ul>
        {groups &&
          groups.map(group => (
            <GroupItem
              key={group.id}
              group={group}
              company_id={company_id}
              handleExpireGroup={handleExpireGroup}
              handleEditGroupSubmit={handleEditGroupSubmit}
            />
          ))}
      </ul>
      <div>
        <GroupForm
          newGroup={group}
          company_id={company_id}
          handleGroupSubmit={handleGroupSubmit}
          clientView={clientView}
        />
      </div>
    </div>
  );
}
