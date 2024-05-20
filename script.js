import data from './raw.json' assert { type: 'json' };

const masterData = data

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

const getRawData = async () => {
    const result = await fetch('raw.json')
    const data = await result.json()
    return data
}

const masterDataCategory = async () => {
    category = []
    data = await getRawData()
    for (let i = 0; i < data.length; i++){
        if (category.findIndex(item => item === data[i]['Category']) < 0){
            category.push(data[i]['Category'])
        }
    }
    return category
}

const mutateCategoryData = async () => {
    const mapCategory = {}
    const data = await getRawData()
    for (let i = 0; i < data.length; i++){
        let transTotal = data[i]['TransTotal']
        if (typeof transTotal === "string") {
            transTotal = transTotal.replace(',', '.')
            transTotal = parseFloat(transTotal)
        }
        if (mapCategory[data[i]['Category']] === undefined){
            mapCategory[data[i]['Category']] = 0
        }
        mapCategory[data[i]['Category']] += parseFloat(transTotal)
    }
    return mapCategory
}

const renderBarChart = ({labels, label, data}) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const barChartCategory = async () => {
    const mutateCategory = await mutateCategoryData()
    const param = {
        labels: Object.keys(mutateCategory),
        label: 'Total Transaction',
        data: Object.values(mutateCategory)
    }

    renderBarChart(param)
}

barChartCategory()