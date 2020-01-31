import React, { useEffect, useState } from "react";

export default function GroupDetails({
  group,
  handleExpireGroup,
  handleEditGroupSubmit
}) {
  const [showDetails, setShowDetails] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  function toggleHistory() {
    setShowHistory(!showHistory);
  }

  return (
    <div data-testid="groupDetails">
      <div>
        <button
          className="btn btn-xs btn-link"
          onClick={() => {
            handleExpireGroup(group.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
