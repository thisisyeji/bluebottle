const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", e => {
    if (!isTxt("id", 5)) e.preventDefault();
    if (!isEmail("email")) e.preventDefault();
    if (!isCheck("gender")) e.preventDefault();
    if (!isCheck("coffee")) e.preventDefault();
    if (!isSelect("select")) e.preventDefault();
    if (!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
});

function isTxt(name, len) {
    if (len == undefined) len = 5;

    const input = form.querySelector(`[name=${name}]`);
    let txt = input.value;

    if (txt.length >= len) {
        const errMsgs = input.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) input.closest("td").querySelector(".errMsg").remove();

        return true;
    } else {
        const errMsgs = input.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) input.closest("td").querySelector(".errMsg").remove();

        const errMsg = document.createElement("p");
        errMsg.classList.add("errMsg");
        errMsg.append(`Must be minimum ${len} characters long.`);
        input.closest("td").append(errMsg);

        return false;
    }
}

function isEmail(name) {
    const input = form.querySelector(`[name=${name}]`);
    const txt = input.value;

    if (/@/.test(txt)) {
        const errMsgs = input.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) input.closest("td").querySelector(".errMsg").remove();

        return true;
    } else {
        const errMsgs = input.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) input.closest("td").querySelector(".errMsg").remove();

        const errMsg = document.createElement("p");
        errMsg.classList.add("errMsg");
        errMsg.append("Make sure your email address is correct.");
        input.closest("td").append(errMsg);

        return false;
    }
}

function isCheck(name) {
    const inputs = form.querySelectorAll(`[name=${name}]`);
    const isChecked = false;

    for (let el of inputs) {
        if (el.checked) isChecked = true;
    }

    if (isChecked) {
        const errMsgs = inputs[0].closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) inputs[0].closest("td").querySelector(".errMsg").remove();

        return true;
    } else {
        const errMsgs = inputs[0].closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) inputs[0].closest("td").querySelector(".errMsg").remove();

        const errMsg = document.createElement("p");
        errMsg.classList.add("errMsg");
        errMsg.append("One thing must be checked.");
        inputs[0].closest("td").append(errMsg);

        return false;
    }
}

function isSelect(name) {
    let sel = form.querySelector(`[name=${name}]`);
    let sel_index = sel.selectedIndex;
    let val = sel[sel_index].value;

    if (val !== "") {
        const errMsgs = sel.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) sel.closest("td").querySelector(".errMsg").remove();

        return true;
    } else {
        const errMsgs = sel.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) sel.closest("td").querySelector(".errMsg").remove();

        const errMsg = document.createElement("p");
        errMsg.classList.add("errMsg");
        errMsg.append("One thing must be selected.");
        sel.closest("td").append(errMsg);

        return false;
    }
}

function isPwd(name1, name2, len) {
    const pwd1 = form.querySelector(`[name=${name1}]`);
    const pwd2 = form.querySelector(`[name=${name2}]`);

    const pwd1_val = pwd1.value;
    const pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+\[\]]/;

    if (pwd1_val === pwd2_val && pwd1_val !== "" && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val) && pwd1_val.length >= len) {
        const errMsgs = pwd1.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) pwd1.closest("td").querySelector(".errMsg").remove();

        return true;
    } else {
        const errMsgs = pwd1.closest("td").querySelectorAll(".errMsg");
        if (errMsgs.length > 0) pwd1.closest("td").querySelector(".errMsg").remove();

        const errMsg = document.createElement("p");
        errMsg.classList.add("errMsg");
        errMsg.append(`Must be minimum ${len} characters long and include any number, special character and letter.`);
        pwd1.closest("td").append(errMsg);

        return false;
    }

}