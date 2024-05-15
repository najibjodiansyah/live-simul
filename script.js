console.log("MASUK")

const ol = document.getElementById("taskList")
const input = document.getElementById("taskInput")

function submit(){
    const li = document.createElement("li")
    li.textContent = input.value

    if (input.value == ""){
        alert("input is required")
        return
    }

    ol.appendChild(li)

    li.addEventListener('click',
        function(){
            ol.removeChild(li)
        }
    )

    input.value = ''
}