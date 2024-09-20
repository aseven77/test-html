const slider = document.querySelector('#slider');
const startSlider = Number(slider.dataset.start);
const startSliderMin = Number(slider.dataset.min);
const startSliderMax = Number(slider.dataset.max);
const rangeValue = document.querySelector(".range__value");
const inputValue = document.querySelector('#natus');

noUiSlider.create(slider, {
    start: [startSlider],
    connect: true,
    range: {
        'min': startSliderMin,
        'max': startSliderMax
    }
});

slider.noUiSlider.on('update', function (values, handle) {
    rangeValue.innerHTML = parseInt(values[handle]) + ' %';
    inputValue.value = parseInt(values[handle])
});

const inputFile = () => {
    const file = document.querySelector("#file");
    const fileTitle = document.querySelector(".input-file__title");

    file.addEventListener("change", function (el) {
        fileTitle.innerHTML = this.value.split('\\').pop()
    })
};


const selectInput = () => {
    const selects = document.querySelectorAll(".input-select");
    const itemSelect = document.querySelectorAll(".input-select__item");
    selects.forEach(function (item) {
        item.addEventListener("click", function (el) {
            item.classList.toggle("input-select--active");
        });
    });

    itemSelect.forEach(function (item) {
        item.addEventListener("click", function (el) {
            item.closest(".input-select").querySelector("input").value = item.innerHTML
            item.closest(".input-select").querySelector(".input-select__head span").innerHTML = item.innerHTML
        });
    });

};

const toogleMenu = document.querySelector(".js-open-menu");

toogleMenu.addEventListener("click", function () {
    document.body.classList.toggle("active-menu")
})

inputFile();
selectInput()