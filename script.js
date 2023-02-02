const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector("form");
const file_input = form.querySelector("input");
const info_text = form.querySelector("p");
const copy_button = wrapper.querySelector(".copy");
const close_button = wrapper.querySelector(".close");

function fetchRequest(form_data, file){
    info_text.innerText = "Scanning QR code..."
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: form_data 
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        info_text.innerText = "Upload QR code to scan";
        wrapper.classList.add("active");
        
    });
}
file_input.addEventListener("change", e => {
    let file = e.target.files[0];
    let form_data = new FormData(); 
    form_data.append("file", file);
    fetchRequest(form_data, file); 
});

copy_button.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => file_input.click());
close_button.addEventListener("click", () => wrapper.classList.remove("active"));