function closeOther(id) {
  const el = document.getElementById(id);
  const bsCollapse = bootstrap.Collapse.getInstance(el);
  if (bsCollapse) {
    bsCollapse.hide();
  };
};

const storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
};

function register() {
    let userField = document.getElementById("regusername");
    let user = userField.value;
    let userError = document.getElementById("regUserError");

    if (user.trim() == "") {
      userError.innerHTML = "Älä jätä tyhjäksi!";
      return;
    };


    let passwdField = document.getElementById("regpasswrd");
    let passwd = passwdField.value;
    let passwdError = document.getElementById("regPasswdError");

    if (passwd.trim() == "") {
      passwdError.innerHTML = "Älä jätä tyhjäksi!";
      return;
    }

    let adminBox = document.getElementById("admin");
    let adminState = adminBox.checked;

    let exists = checkExists(user);
    if (exists == true) {
      userError.innerHTML = "Käyttäjänimi jo käytössä";
    }
    else {
      let voted = [];
      storage.set(user, [user, passwd, adminState, voted]);
      userError.innerHTML = "";
      passwdError.innerHTML = "";
      userField.value = "";
      passwdField.value = "";
      document.getElementById("regSucc").innerHTML = "Rekisteröityminen onnistui!";
    };
};

function login() {
  let userField = document.getElementById("logusername");
  let user = userField.value;
  let userError = document.getElementById("logUserError");

  let passwdField = document.getElementById("logpasswrd");
  let passwd = passwdField.value;
  let passwdError = document.getElementById("logPasswdError");

  let exists = checkExists(user);
  if (exists == false) {
    userError.innerHTML = "Käyttäjää ei ole olemassa";
  }
  else {
    userError.innerHTML = "";
    let correctPasswd = checkPasswd(user, passwd);
    if (correctPasswd == false) {
      passwdError.innerHTML = "Väärä salasana";
    }
    else {
      userField.value = "";
      passwdField.value = "";
      buildSite(user);
    };
  };
};

function checkExists(username) {
    let user = localStorage.getItem(username);
    if (user == null)
      return false;
    else
      return true;
};

function checkPasswd(user, passwd) {
  let storagePasswd = storage.get(user)[1];
  if (storagePasswd == passwd)
    return true
  else
    return false
};

function buildSite(username) {
  let isAdmin = storage.get(username)[2];
  document.getElementById("polls").innerHTML = "";
  buildNavbar(username, isAdmin);
  buildPollDiv();
};

function buildNavbar(username, isAdmin) {
  emptyNav();
  if (isAdmin == true) { 
    reusePanels()
    adminBtns() 
  }
  else {
    removePanels();
  };
  buildLogOut();
  buildUserHeader(username);
};

function emptyNav() {
  let navbar = document.getElementById("navbar");
  navbar.innerHTML = "";
};

function removePanels() {
  let login = document.getElementById("loginpanel");
  let register = document.getElementById("registerpanel");
  login.remove();
  register.remove();
};

function adminBtns() {
  let navbar = document.getElementById("navbar");
  let createBtn = document.createElement("button");
  createBtn.innerHTML = "Make poll";
  createBtn.className = "logbtn";
  createBtn.id = "createVote";
  createBtn.setAttribute("data-bs-toggle", "collapse");
  createBtn.setAttribute("data-bs-target", "#registerpanel");
  createBtn.addEventListener("click", () => closeOther("loginpanel"));
  navbar.appendChild(createBtn);


  let delBtn = document.createElement("button");
  delBtn.innerHTML = "Delete poll";
  delBtn.className = "logbtn";
  delBtn.id = "delVote";
  delBtn.setAttribute("data-bs-toggle", "collapse");
  delBtn.setAttribute("data-bs-target", "#loginpanel");
  delBtn.addEventListener("click", () => closeOther("registerpanel"));
  navbar.appendChild(delBtn);
};

function reusePanels() {
  closeOther("loginpanel");
  reusePanel1();
  reusePanel2();
};

function reusePanel1() {
  let panel1 = document.getElementById("panel1");
  panel1.innerHTML = "";
  let pollInputLabel = document.createElement("label");
  pollInputLabel.innerHTML = "What are we arguing about?:";
  let pollInput = document.createElement("input");
  pollInput.setAttribute("id", "pollName");
  panel1.appendChild(pollInputLabel);
  panel1.appendChild(document.createElement("br"));
  panel1.appendChild(pollInput);
  panel1.appendChild(document.createElement("br"));
  panel1.appendChild(document.createElement("br"));

  let pollOpt1Label = document.createElement("label")
  pollOpt1Label.innerHTML = "Option 1:"
  let pollOpt1Input = document.createElement("input");
  pollOpt1Input.setAttribute("id", "pollOpt1");
  panel1.appendChild(pollOpt1Label);
  panel1.appendChild(document.createElement("br"));
  panel1.appendChild(pollOpt1Input);
  panel1.appendChild(document.createElement("br"));
  panel1.appendChild(document.createElement("br"));

  let pollOpt2Label = document.createElement("label")
  pollOpt2Label.innerHTML = "Option 2:"
  let pollOpt2Input = document.createElement("input");
  pollOpt2Input.setAttribute("id", "pollOpt2");
  panel1.appendChild(pollOpt2Label);
  panel1.appendChild(document.createElement("br"));
  panel1.appendChild(pollOpt2Input);
  panel1.appendChild(document.createElement("br"));
  panel1.appendChild(document.createElement("br"));

  let makerBtn = document.createElement("button")
  makerBtn.innerHTML = "Make"
  makerBtn.addEventListener("click", () => makePoll());
  panel1.appendChild(makerBtn);
}

function reusePanel2() {
  checkPolls();
  let panel2 = document.getElementById("panel2");
  panel2.innerHTML = "";
  let polls = storage.get("polls")

  for (let currentPoll of polls) {
    let remDiv = document.createElement("div");
    remDiv.setAttribute("class", "remDiv");

    let remTxt = document.createElement("p");
    remTxt.innerHTML = currentPoll.name;
    remDiv.appendChild(remTxt)

    let remBtn = document.createElement("buttton");
    remBtn.innerHTML = "Delete";
    remBtn.setAttribute("class", "remBtn")
    remBtn.addEventListener("click", () => {
      polls = polls.filter(p => p.id !== currentPoll.id);
      storage.set("polls", polls);
      buildPolls();
      reusePanel2();
    });

    remDiv.appendChild(remBtn);
    panel2.appendChild(remDiv);
  }
}

function buildLogOut() {
  let navbar = document.getElementById("navbar");
  let logOutBtn = document.createElement("button");
  logOutBtn.innerHTML = "Log Out";
  logOutBtn.className = "logbtn";
  logOutBtn.addEventListener("click", () => { location.reload() });
  navbar.appendChild(logOutBtn);
}

function makePoll() {
  let polls = storage.get("polls");
  let tsId = null;
  if (polls.length === 0) {
    tsId = 1;
  } else {
    tsId = Math.max(...polls.map(p => p.id)) + 1;
  };

  let pollObj = {
      id: tsId,
      name: document.getElementById("pollName").value,
      opt1: document.getElementById("pollOpt1").value,
      opt2: document.getElementById("pollOpt2").value,
      yay: 0,
      nay: 0,
      voted: false
  };
  polls.push(pollObj);
  storage.set("polls", polls);
  buildPolls();
  reusePanel2();
}

function buildUserHeader(username) {
  let navbar = document.getElementById("navbar");
  let userHeader = document.createElement("p");
  userHeader.innerHTML = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
  </svg> ${username}`;
  userHeader.id = "userHeader";
  navbar.appendChild(userHeader);
};

function buildPollDiv() {
  checkPolls();
  buildPolls();
};

function buildPolls() {
  let polls = storage.get("polls");
  let pollDiv = document.getElementById("polls");
  pollDiv.innerHTML = "";
  for (let currentPoll of polls) {
    let i = currentPoll.id
    let div = document.createElement("div");
    div.setAttribute("id", i);
    div.setAttribute("class", "pollDiv");

    let title = document.createElement("h1");
    title.innerHTML = currentPoll.name;
    div.appendChild(title);

    let buttonDiv = document.createElement("div");
    let oneBtnDiv = document.createElement("div");
    oneBtnDiv.setAttribute("class", "voteDiv");
    let twoBtnDiv = document.createElement("div")
    twoBtnDiv.setAttribute("class", "voteDiv")

    if (currentPoll.voted == false) {
      let oneBtn = document.createElement("input");
      oneBtn.setAttribute("type", "radio");
      oneBtn.setAttribute("value", 1);
      oneBtn.setAttribute("class", "voteBtn");
      oneBtn.setAttribute("name", `pollBtns${i}`);

      let oneLabel = document.createElement("label");
      oneLabel.setAttribute("class", "voteLabel");
      oneLabel.innerHTML = currentPoll.opt1;
      oneBtnDiv.appendChild(oneBtn);
      oneBtnDiv.appendChild(oneLabel);

      let twoBtn = document.createElement("input");
      twoBtn.setAttribute("type", "radio");
      twoBtn.setAttribute("value", 2);
      twoBtn.setAttribute("class", "voteBtn");
      twoBtn.setAttribute("name", `pollBtns${i}`);

      let twoLabel = document.createElement("label");
      twoLabel.setAttribute("class", "voteLabel");
      twoLabel.innerHTML = currentPoll.opt2;
      twoBtnDiv.appendChild(twoBtn);
      twoBtnDiv.appendChild(twoLabel);

      buttonDiv.appendChild(oneBtnDiv);
      buttonDiv.appendChild(twoBtnDiv);

      let submitBtn = document.createElement("button");
      submitBtn.innerHTML = "Vote";
      submitBtn.setAttribute("class", "submitBtn");
      submitBtn.addEventListener("click", () => confirmVote(i));
      buttonDiv.appendChild(submitBtn);
    } else {
      let opt1Text = document.createElement("p");
      opt1Text.innerHTML = `${currentPoll.opt1} (${Math.round(currentPoll.yay / (currentPoll.yay + currentPoll.nay) * 100 * 100) / 100}%)`;
      oneBtnDiv.appendChild(opt1Text);

      let opt2Text = document.createElement("p");
      opt2Text.innerHTML = `${currentPoll.opt2} (${Math.round(currentPoll.nay / (currentPoll.yay + currentPoll.nay) * 100 * 100) / 100}%)`;
      twoBtnDiv.appendChild(opt2Text);

      buttonDiv.appendChild(oneBtnDiv);
      buttonDiv.appendChild(twoBtnDiv);

      let cancelBtn = document.createElement("button");
      cancelBtn.innerHTML = "Cancel vote";
      cancelBtn.setAttribute("class", "submitBtn");
      cancelBtn.addEventListener("click", () => unconfirmVote(i));
      buttonDiv.appendChild(cancelBtn);
    }
    div.appendChild(buttonDiv);

    pollDiv.appendChild(div);
  };
};

function confirmVote(pollID) {
  event.preventDefault();

  let clicked = document.querySelector(`input[name="pollBtns${pollID}"]:checked`);
  if (!clicked) return;
  
  let polls = storage.get("polls");
  let currentPoll = polls.find(p => p.id === pollID);
  let vote = clicked.value;
  if (vote == 1) {
    currentPoll.yay += 1;
    currentPoll.what = "yay";
    } else {
      currentPoll.nay += 1;
      currentPoll.what = "nay";
    } 
  currentPoll.voted = true;
  storage.set("polls", polls);
  buildPolls();
}

function unconfirmVote(pollID) {
  event.preventDefault();

  let polls = storage.get("polls");
  let currentPoll = polls.find(p => p.id === pollID);
  let vote = currentPoll.what;
  if (vote == "yay") {
    currentPoll.yay -= 1;
  } else {
    currentPoll.nay -= 1;
  }
  currentPoll.voted = false;
  currentPoll.whatt = null;
  storage.set("polls", polls)
  buildPolls();
}

function checkPolls() {
  if (storage.get("polls") === null) {
    setPlaceholder();
  };
};

function setPlaceholder() {
  let polls = [
    {
      id: 1,
      name: "Dogs vs Cats",
      opt1: "Dogs",
      opt2: "Cats",
      yay: 500,
      nay: 500,
      voted: false,
      what: null
    },
    {
      id: 2,
      name: "Is this website very cool and awesome?",
      opt1: "Extremely so",
      opt2: "No way dude",
      yay: 67,
      nay: 1,
      voted: false,
      what: null
    }
  ]
  storage.set("polls", polls)
};

document.getElementById("sendregister").addEventListener("click", register);
document.getElementById("sendlogin").addEventListener("click", login);