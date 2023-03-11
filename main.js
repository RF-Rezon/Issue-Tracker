document.getElementById("issueInputForm").addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;

  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");

  if (description.length == 0 || assignedTo.length == 0) {
    submitIssue();
  } else {
    const id = Math.floor(Math.random() * 100000000) + "";
    const status = "Open";

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (window.localStorage.getItem("issues")) {
      issues = JSON.parse(window.localStorage.getItem("issues"));
    }
    issues.push(issue);
    window.localStorage.setItem("issues", JSON.stringify(issues));

    e.preventDefault();
    fetchIssues();
  }
}

const closeIssue = (id) => {
  const issues = JSON.parse(window.localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id == id);
  currentIssue.status = "Closed";
  window.localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  let issues = JSON.parse(window.localStorage.getItem("issues"));

  let index = issues.findIndex((element) => +element.id == id);
  let xp = issues.splice(index, 1);

  console.log(xp);
  window.localStorage.removeItem(xp[0]);
  window.localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(window.localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};
