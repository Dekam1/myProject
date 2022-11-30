const images = [{
        city: 'Rostov-on-Don LCD admiral',
        apartmentArea: '81 m2',
        repairTime: '3.5 months',
        repairCost: 'Upon request',
        imageUrl: 'img/sliderImg/image1.jpg'
    },
    {
        city: 'Sochi Thieves',
        apartmentArea: '105 m2',
        repairTime: '4 months',
        repairCost: 'Upon request',
        imageUrl: 'img/sliderImg/image2.jpg'
    },
    {
        city: 'Rostov-on-Don Patriotic',
        apartmentArea: '93 m2',
        repairTime: '3 months',
        repairCost: 'Upon request',
        imageUrl: 'img/sliderImg/image3.jpg'
    }
]

function initSlider() {

    let sliderImages = document.querySelector(".slider-images");
    let sliderArrows = document.querySelector(".arrows");
    let sliderDots = document.querySelector(".slider__dots");
    let optionText = document.querySelectorAll('.options__text');
    let sliderNav = document.querySelector('.slider-nav');

    initImages();
    initArrows();
    initDots();
    initTitles();
    initSliderNav();

    function initImages() {
        images.forEach((item, index) => {
            let imageDiv = `
            <div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image: url(${item.imageUrl});" data-index="${index}"></div>
            `
            sliderImages.innerHTML += imageDiv;
        });
    };

    function initArrows() {
        sliderArrows.querySelectorAll('.arrow').forEach((arrow) => {
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains('arrow-left')) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            })
        })
    };

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initSliderNav() {
        images.forEach((image, index) => {
            let li = `<li class="slider-nav_li"><a href="#" class="slider-nav_link n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].city}</a></li>`
            sliderNav.innerHTML += li;
        });
        sliderNav.querySelectorAll('.slider-nav_link').forEach((link) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
        sliderNav.querySelector(".active").classList.remove("active");
        sliderNav.querySelector(".n" + num).classList.add("active");
        changeTitle(num)
    };

    function initTitles() {
        let city = `${images[0].city}`;
        let apartmentArea = `${images[0].apartmentArea}`;
        let repairTime = `${images[0].repairTime}`;
        let repairCost = `${images[0].repairCost}`;
        optionText[0].innerText = city;
        optionText[1].innerText = apartmentArea;
        optionText[2].innerText = repairTime;
        optionText[3].innerText = repairCost;
    };

    function changeTitle(num) {
        optionText[0].innerHTML = images[num].city;
        optionText[1].innerHTML = images[num].apartmentArea;
        optionText[2].innerHTML = images[num].repairTime;
        optionText[3].innerHTML = images[num].repairCost;
    }
}

document.addEventListener('DOMContentLoaded', initSlider)