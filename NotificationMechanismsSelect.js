import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchJson } from "../../lib/Fetching";
import Select from "react-select";

export default function NotificationMechanismsSelect({
  notification_mechanism_ids,
  defaultValue,
  company_id,
  handleSelectChange
}) {
  const [notificationMechanisms, setNotificationMechanisms] = useState([]);

  const fetchNotificationMechanisms = () =>
    fetchJson("/notification_mechanisms.json").then(json => {
      if (json.error) alert(json.error);
      else setNotificationMechanisms(json);
    });

  useEffect(
    () => {
      fetchNotificationMechanisms();
    },
    [company_id]
  );

  const displayOptions = notificationMechanisms.map(b => ({
    value: b.id,
    label: b.name
  }));

  const selectedOptions = displayOptions.filter(o =>
    notification_mechanism_ids.includes(o.value)
  );

  return (
    <Select
      value={selectedOptions}
      isMulti={true}
      placeholder={"Notification Mechanisms..."}
      name="notification_mechanisms"
      options={displayOptions}
      onChange={handleSelectChange("notification_mechanisms")}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
